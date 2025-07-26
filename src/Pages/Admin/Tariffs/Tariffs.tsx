import { LuPlus } from "react-icons/lu";
import styles from "./Tariffs.module.scss";
import { NumericFormat } from "react-number-format";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Loading } from "../../../widgets/Loading/Loading";
import axios from "axios";
import { toast } from "react-toastify";

interface Tariff {
  id?: number;
  name: string;
  daily_reward: number | "";
}

// const tariffs = [
//   {
//     id: 1,
//     name: "Легкий старт",
//     percentPerDay: 0.8,
//     total: 240,
//     min: 1000,
//     max: 499000,
//   },
//   {
//     id: 2,
//     name: "Триумф",
//     percentPerDay: 0.9,
//     total: 270,
//     max: 999000,
//     min: 500000,
//   },
//   {
//     id: 3,
//     name: "Максимум",
//     percentPerDay: 1,
//     total: 300,
//     min: 1000000,
//     max: 1999000,
//   },
// ];

export const Tariffs = () => {
  const [selectedTarif, setSelectedTarif] = useState<null | Tariff>(null);
  const [tariffName, setTariffName] = useState("");
  const [dailyReward, setDailyReward] = useState<number | "">(0);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    axios(`${baseUrl}/admin/tariffs`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => setTariffs(res.data))
      .catch((error) => {
        console.error("Error fetching tariffs:", error);
        toast.error("Ошибка при загрузке тарифов");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCloseModal = () => {
    setSelectedTarif(null);
    setTariffName("");
    setDailyReward("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let data: Tariff = {
      name: tariffName,
      daily_reward: dailyReward,
    };

    if (editing && selectedTarif) {
      data = {
        ...data,
        id: selectedTarif.id,
      };
    }

    axios(`${baseUrl}/admin/tariffs`, {
      method: editing ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data,
    })
      .then(() => {
        setTariffs((prev) => {
          if (editing) {
            return prev?.map((tariff) =>
              tariff.id === selectedTarif?.id ? data : tariff
            );
          } else {
            return [
              ...prev,
              { ...data, id: Math.max(...prev.map((t) => t.id || 0)) + 1 },
            ];
          }
        });
        setSelectedTarif(null);
        setTariffName("");
        setDailyReward(0);
        toast.success(
          editing ? "Тариф обновлен успешно" : "Тариф добавлен успешно"
        );
      })
      .catch((error) => {
        console.error("Error saving tariff:", error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.tariffs}>
      {loading && <Loading />}
      <section className={styles.tariffs_header}>
        <h1 className={styles.tariffs_title}>Тарифы </h1>
        <button
          onClick={() => {
            setSelectedTarif({
              name: "",
              daily_reward: 0,
            });
            setTariffName("");
            setDailyReward("");
            setEditing(false);
          }}
        >
          <LuPlus />
        </button>
      </section>
      {tariffs && tariffs.length ? (
        <div className={styles.tariffs_table}>
          <table border={1}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>% в день</th>
                <th>% за весь период</th>
                {/* <th>Мин. сумма</th>
              <th>Макс. сумма</th> */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tariffs.map((tariff) => (
                <tr key={tariff.id}>
                  <td>{tariff.id}</td>
                  <td>{tariff.name}</td>
                  <td>{tariff.daily_reward}%</td>
                  <td>{Number(tariff.daily_reward) * 300} %</td>
                  {/* <td>
                  <NumericFormat
                    value={tariff.min}
                    displayType="text"
                    thousandSeparator=" "
                    decimalSeparator=","
                  />{" "}
                  ₽
                </td> */}
                  {/* <td>
                  {tariff.max ? (
                    <NumericFormat
                      value={tariff.max}
                      displayType="text"
                      thousandSeparator=" "
                      decimalSeparator=","
                      suffix=" ₽"
                    />
                  ) : (
                    "Нет лимита"
                  )}
                </td> */}
                  <td>
                    <section>
                      <button
                        onClick={() => {
                          setSelectedTarif(tariff);
                          setTariffName(tariff.name);
                          setDailyReward(tariff.daily_reward);
                          setEditing(true);
                        }}
                      >
                        <FaPenToSquare />
                      </button>
                      <button>
                        <FaRegTrashCan />
                      </button>
                    </section>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Нет тарифов</div>
      )}

      {selectedTarif && (
        <div className={styles.tariffs_modal}>
          <div className={styles.tariffs_modal_body}>
            <button
              className={styles.tariffs_modal_body_closeButton}
              onClick={handleCloseModal}
            >
              <AiOutlineClose />
            </button>
            <h2>Тариф {tariffName}</h2>
            <form>
              <label>
                <p>Название</p>
                <input
                  type="text"
                  name="name"
                  defaultValue={tariffName}
                  onChange={(e) => setTariffName(e.target.value)}
                />
              </label>{" "}
              <label>
                <p>Проценты в день</p>
                <NumericFormat
                  defaultValue={dailyReward}
                  onChange={(e) =>
                    setDailyReward(Number(e.target.value.split(" %")[0]))
                  }
                  displayType="input"
                  thousandSeparator=" "
                  decimalSeparator="."
                  suffix=" %"
                  name="percentPerDay"
                  allowNegative={false}
                />
              </label>{" "}
              <label>
                <p>Проценты за весь период</p>
                <NumericFormat
                  value={Number(dailyReward) * 300}
                  displayType="text"
                  thousandSeparator=" "
                  decimalSeparator=","
                  suffix=" %"
                  name="percentPerDay"
                  allowNegative={false}
                />
              </label>{" "}
              {/* <label>
                <p>Минимальная сумма</p>
                <NumericFormat
                  defaultValue={minAmount}
                  onChange={(e) =>
                    setMinAmount(Number(e.target.value.split(" ")[0]))
                  }
                  displayType="input"
                  thousandSeparator=" "
                  decimalSeparator="."
                  suffix=" ₽"
                  name="min"
                  allowNegative={false}
                />
              </label>{" "} */}
              {/* <label>
                <p>Максимальная сумма</p>
                <NumericFormat
                  defaultValue={maxAmount}
                  onChange={(e) =>
                    setMaxAmount(Number(e.target.value.split(" ")[0]))
                  }
                  displayType="input"
                  thousandSeparator=" "
                  decimalSeparator="."
                  suffix=" ₽"
                  name="max"
                  allowNegative={false}
                />
              </label>{" "} */}
              <button type="submit" onClick={handleSubmit}>
                Сохранить
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
