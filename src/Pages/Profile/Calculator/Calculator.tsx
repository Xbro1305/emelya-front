import { NumericFormat } from "react-number-format";
import styles from "./Calculator.module.scss";
import { useEffect, useState } from "react";
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
        <button className={styles.calculator_right_getButton}>
          Инвестировать
        </button>
      </div>
    </div>
  );
};
