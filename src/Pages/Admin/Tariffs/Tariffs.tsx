import { LuPlus } from "react-icons/lu";
import styles from "./Tariffs.module.scss";
import { NumericFormat } from "react-number-format";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Loading } from "../../../widgets/Loading/Loading";
import axios from "axios";
import { toast } from "react-toastify";

interface Tariff {
  id?: number;
  name: string;
  daily_reward: number | "";
  block_days?: string | number;
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
  const [dailyReward, setDailyReward] = useState<number | "">("");
  const [blockUntil, setBlockUntil] = useState<any | "">("");
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState<false | Tariff>(false);
  const [loading, setLoading] = useState(true);
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const refresh = () =>
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

  useEffect(() => {
    refresh();
  }, []);

  const handleCloseModal = () => {
    setSelectedTarif(null);
    setTariffName("");
    setDailyReward("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const date = new Date();

    const today = new Date();

    date.setDate(today.getDate() + blockUntil);

    console.log(date.setDate(today.getDate() + blockUntil));

    let data: Tariff = {
      name: tariffName,
      daily_reward: dailyReward,
      block_days: `${date.toISOString()}`,
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
      .finally(() => refresh());
  };

  const deleteTariff = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);

    e.preventDefault();

    if (deleting && typeof deleting !== "boolean") {
      axios(`${baseUrl}/admin/tariffs?id=${deleting.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          setDeleting(false);
          toast.success("Удалено успешно");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Что-то пошло не так");
        })
        .finally(() => setLoading(false));
    }
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
                <th>Доход в день</th>
                <th>Срок блокировки</th>
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
                  <td>{tariff.daily_reward}</td>
                  <td>
                    {typeof tariff?.block_days === "string"
                      ? tariff.block_days.split("T")[0]
                      : tariff.block_days}
                  </td>
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
                      <button onClick={() => setDeleting(tariff)}>
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
                <p>Дневное вознаграждение</p>
                <NumericFormat
                  defaultValue={dailyReward}
                  onChange={(e) =>
                    setDailyReward(
                      Number(e.target.value.split(" ₽")[0].replace(/\s/g, ""))
                    )
                  }
                  displayType="input"
                  thousandSeparator=" "
                  decimalSeparator="."
                  suffix=" ₽"
                  name="percentPerDay"
                  allowNegative={false}
                />
              </label>{" "}
              <label>
                <p>Срок блокировки</p>
                <NumericFormat
                  defaultValue={blockUntil}
                  onChange={(e) => {
                    setBlockUntil(Number(e.target.value.split(" Дней")[0]));
                  }}
                  displayType="input"
                  thousandSeparator=" "
                  decimalSeparator=","
                  suffix=" Дней"
                  name="block_until"
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
      {deleting && (
        <div className={styles.tariffs_modal}>
          <div className={styles.tariffs_modal_body}>
            <button
              className={styles.tariffs_modal_body_closeButton}
              onClick={() => setDeleting(false)}
            >
              <AiOutlineClose />
            </button>
            <h2>Вы хотите удалить тариф {deleting.name}?</h2>
            <form onSubmit={deleteTariff}>
              <button>Удалить</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
