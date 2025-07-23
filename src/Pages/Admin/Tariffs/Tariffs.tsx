import { LuPlus } from "react-icons/lu";
import styles from "./Tariffs.module.scss";
import { NumericFormat } from "react-number-format";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Loading } from "../../../widgets/Loading/Loading";
import axios from "axios";

interface Tariff {
  id: number;
  name: string;
  percentPerDay: number;
  total: number;
  min: number;
  max?: number | null;
}

const tariffs = [
  {
    id: 1,
    name: "Легкий старт",
    percentPerDay: 0.8,
    total: 240,
    min: 1000,
    max: 499000,
  },
  {
    id: 2,
    name: "Триумф",
    percentPerDay: 0.9,
    total: 270,
    max: 999000,
    min: 500000,
  },
  {
    id: 3,
    name: "Максимум",
    percentPerDay: 1,
    total: 300,
    min: 1000000,
    max: 1999000,
  },
];

export const Tariffs = () => {
  const [selectedTarif, setSelectedTarif] = useState<null | Tariff>(null);
  const [tariffName, setTariffName] = useState("");
  const [percentPerDay, setPercentPerDay] = useState<number | "">(0);
  const [minAmount, setMinAmount] = useState<number | "">(0);
  const [maxAmount, setMaxAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [tariffs, setTariffs] = useState<Tariff[]>([]);

  useEffect(() => {
    axios("https://emelia-invest.com/api/admin/tariffs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => setTariffs(res.data))
      .catch((error) => {
        console.error("Error fetching tariffs:", error);
        setTariffs(tariffs); // Fallback to initial tariffs if fetch fails
      });
  }, []);

  const handleCloseModal = () => {
    setSelectedTarif(null);
    setTariffName("");
    setPercentPerDay("");
    setMinAmount("");
    setMaxAmount(null);
  };

  return (
    <div className={styles.tariffs}>
      {loading && <Loading />}
      <section className={styles.tariffs_header}>
        <h1 className={styles.tariffs_title}>Тарифы </h1>
        <button
          onClick={() => {
            setSelectedTarif({
              id: 0,
              name: "",
              percentPerDay: 0,
              total: 0,
              min: 0,
              max: null,
            });
            setTariffName("");
            setPercentPerDay("");
            setMinAmount("");
            setMaxAmount(null);
          }}
        >
          <LuPlus />
        </button>
      </section>
      <div className={styles.tariffs_table}>
        <table border={1}>
          <thead>
            <tr>
              <th>Название</th>
              <th>% в день</th>
              <th>% за весь период</th>
              <th>Мин. сумма</th>
              <th>Макс. сумма</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tariffs.map((tariff) => (
              <tr key={tariff.id}>
                <td>{tariff.name}</td>
                <td>{tariff.percentPerDay}%</td>
                <td>{tariff.total} %</td>
                <td>
                  <NumericFormat
                    value={tariff.min}
                    displayType="text"
                    thousandSeparator=" "
                    decimalSeparator=","
                  />{" "}
                  ₽
                </td>
                <td>
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
                </td>
                <td>
                  <section>
                    <button
                      onClick={() => {
                        setSelectedTarif(tariff);
                        setTariffName(tariff.name);
                        setPercentPerDay(tariff.percentPerDay);
                        setMinAmount(tariff.min);
                        setMaxAmount(tariff.max || null);
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
                  defaultValue={percentPerDay}
                  onChange={(e) =>
                    setPercentPerDay(Number(e.target.value.split(" %")[0]))
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
                  value={Number(percentPerDay) * 300}
                  displayType="text"
                  thousandSeparator=" "
                  decimalSeparator=","
                  suffix=" %"
                  name="percentPerDay"
                  allowNegative={false}
                />
              </label>{" "}
              <label>
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
              </label>{" "}
              <label>
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
              </label>{" "}
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setLoading(true);
                  console.log({
                    id: selectedTarif.id,
                    name: tariffName,
                    percentPerDay: Number(percentPerDay),
                    total: Number(percentPerDay) * 300,
                    min: Number(minAmount),
                    max: maxAmount,
                  });
                  setLoading(false);
                  handleCloseModal();
                }}
              >
                Сохранить
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
