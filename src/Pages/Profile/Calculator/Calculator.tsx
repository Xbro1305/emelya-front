import { NumericFormat } from "react-number-format";
import styles from "./Calculator.module.scss";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import { Loading } from "../../../widgets/Loading/Loading";
import { toast } from "react-toastify";

const tarifs = [
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
    percentPerDay: 1.0,
    total: 300,
    max: 999000,
    min: 500000,
  },
  {
    id: 3,
    name: "Максимум",
    percentPerDay: 1.2,
    total: 360,
    min: 1000000,
    max: 1999000,
  },
];

export const Calculator = () => {
  const [selectedTarif, setSelectedTarif] = useState(tarifs[0]);
  const [sum, setSum] = useState(selectedTarif.min);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const id = new URLSearchParams(window.location.search).get("tarifId");

  useEffect(() => {
    setSum(selectedTarif.min);
  }, [selectedTarif]);

  useEffect(() => {
    setTimeout(() => {
      if (id) {
        const tarif = tarifs.find((tarif) => tarif.id === Number(id));
        if (tarif) {
          setSelectedTarif(tarif);
          setSum(tarif.min);
        }
      }
    }, 300);
  }, [id]);

  return (
    <div className={styles.calculator}>
      {loading && <Loading />}
      <div className={styles.calculator_right_content}>
        <div className={styles.calculator_right_tarifs}>
          {tarifs.map((tarif) => (
            <div
              key={tarif.id}
              className={
                selectedTarif.id === tarif.id
                  ? styles.calculator_right_tarifs_item_active
                  : styles.calculator_right_tarifs_item
              }
              onClick={() => setSelectedTarif(tarif)}
            >
              <p>{tarif.name}</p>
            </div>
          ))}
        </div>
        <div className={styles.calculator_right_conditions}>
          <p>
            Срок вложения: <b>300 дней</b>
          </p>
          <p>
            Доходность: <b>{selectedTarif.percentPerDay}% / день</b>
          </p>
        </div>
        <div className={styles.calculator_right_range}>
          <section>
            <p>Сумма</p>{" "}
            <span>
              <NumericFormat
                displayType="text"
                value={sum}
                thousandSeparator=" "
              />{" "}
              ₽
            </span>
          </section>
          <div
            style={{ position: "relative" }}
            className={styles.calculator_right_range_input}
          >
            <input
              type="range"
              min={selectedTarif.min}
              max={selectedTarif.max}
              step={1000}
              value={sum}
              onChange={(e) => setSum(Number(e.target.value))}
            />
          </div>
          <div>
            <p onClick={() => setSum(selectedTarif.min)}>
              <NumericFormat
                displayType="text"
                value={selectedTarif.min}
                thousandSeparator=" "
              />
              ₽
            </p>
            <p onClick={() => setSum(selectedTarif.max)}>
              <NumericFormat
                displayType="text"
                value={selectedTarif.max}
                thousandSeparator=" "
              />
              ₽
            </p>
          </div>
        </div>

        <div className={styles.calculator_right_info}>
          <section>
            <p>Доход за весь период</p> <span></span>
            <span>240%</span>
          </section>
          <section>
            <p>Вы получаете</p> <span></span>
            <NumericFormat
              displayType="text"
              value={(sum * selectedTarif.total) / 100}
              thousandSeparator=" "
              suffix="₽"
            />
          </section>
        </div>
        <button
          onClick={() => {
            const user = JSON.parse(localStorage.getItem("user") || "{}");

            setLoading(true);
            axios(`${import.meta.env.VITE_APP_API_URL}/notify`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              data: {
                data: `Пользователь ${user?.FirstName} (ID: ${user?.ID}) (Номер телефона: ${user?.Phone}) хочет инвестировать ${sum} ₽ по тарифу ${selectedTarif?.name}`,
              },
            })
              .then(() => setIsOpen(true))
              .catch(() =>
                toast.error("Что-то пошло не так. Попробуйте заново попозже")
              )
              .finally(() => setLoading(false));
          }}
          className={styles.calculator_right_getButton}
        >
          Инвестировать
        </button>
      </div>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modal_body}>
            <button onClick={() => setIsOpen(false)}>&times;</button>
            <h1>Сканируй и оплати в приложении банка</h1>
            <QRCode
              value={`https://qr.nspk.ru/AS2A002B19TA8GLK9AEAB6FSI5IP6S94?type=01&bank=100000000004&crc=F716`}
              bgColor="#2E1A00"
              fgColor="#B47427"
            />
          </div>
        </div>
      )}
    </div>
  );
};
