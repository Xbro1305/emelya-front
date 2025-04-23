import { useState } from "react";
import styles from "./Operations.module.scss";
import { FaChevronDown } from "react-icons/fa";

export const Operations = () => {
  const [active, setActive] = useState<false | number>(false);

  return (
    <div className={styles.operations}>
      <div className={styles.operations_top}>
        <h1 className={styles.operations_top_title}>Мои операции</h1>
        <section>
          <p>
            Доступно к выводу: <span>15 000 ₽ </span>
          </p>
          <button>Поставить на вывод</button>
        </section>
      </div>
      <div className={styles.operations_table}>
        <div className={styles.operations_table_top}>
          <p>Вид</p>
          <p>Сумма</p>
          <p>Время</p>
          <p>Дата</p>
        </div>
        <div className={styles.operations_table_body}>
          {data.map((item) => (
            <div
              onClick={() => setActive(active == item.id ? false : item.id)}
              key={item.id}
              className={styles.operations_table_item}
            >
              <p className={styles.operations_table_item_p}>{item.type}</p>
              <p className={styles.operations_table_item_p}>{item.sum}</p>
              <p
                className={
                  active == item.id ? styles.operations_table_item_p : ""
                }
              >
                {item.time}
              </p>
              <p
                className={
                  active == item.id ? styles.operations_table_item_p : ""
                }
              >
                {item.date}
              </p>
              <span
                style={{
                  transform:
                    active == item.id ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <FaChevronDown />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const data = [
  {
    id: 1,
    type: "Пополнение",
    sum: "10 000 ₽",
    time: "12:00",
    date: "12.12.2023",
  },
  {
    id: 2,
    type: "Пополнение",
    sum: "10 000 ₽",
    time: "12:00",
    date: "12.12.2023",
  },
];
