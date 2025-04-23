import { useEffect, useState } from "react";
import styles from "./Operations.module.scss";
import { FaChevronDown } from "react-icons/fa";
import { NumericFormat } from "react-number-format";
import { BiLogoMastercard, BiLogoVisa } from "react-icons/bi";

export const Operations = () => {
  const [active, setActive] = useState<false | number>(false);
  const [isOpen, setIsOpen] = useState<false | number>(false);
  const [limit, setLimit] = useState(15000);
  const [sum, setSum] = useState<string>("0");
  const [payment, setPayment] = useState<false | string>(false);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    setLimit(15000);
  }, []);

  return (
    <div className={styles.operations}>
      <div className={styles.operations_top}>
        <h1 className={styles.operations_top_title}>Мои операции</h1>
        <section>
          <p>
            Доступно к выводу:{" "}
            <NumericFormat
              value={limit}
              thousandSeparator=" "
              displayType="text"
              suffix=" ₽"
            />{" "}
          </p>
          <button onClick={() => setIsOpen(1)}>Поставить на вывод</button>
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
      {isOpen == 1 && (
        <div className={styles.modal}>
          <div className={styles.modal_body}>
            <h1 className={styles.modal_title}>Поставить на вывод</h1>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.modal_closeButton}
            >
              &times;
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                console.log(data);
                setIsOpen(2);
              }}
            >
              <label className={styles.modal_input_label}>
                <p>Сумма:</p>
                <NumericFormat
                  max={limit}
                  value={sum}
                  onChange={(e) => setSum(e.target.value)}
                  thousandSeparator=" "
                  decimalSeparator=","
                  name="sum"
                  suffix=" ₽"
                />
              </label>
              <label className={styles.modal_input_label}>
                <p>Выберите способ получения:</p>
              </label>
              <label className={styles.modal_payment_label}>
                <p>
                  <BiLogoVisa /> **5678
                </p>
                <input
                  type="radio"
                  onChange={() => setPayment("visa")}
                  name="payment"
                  value="visa"
                />
              </label>
              <label className={styles.modal_payment_label}>
                <p>
                  <BiLogoMastercard /> **5138
                </p>
                <input
                  type="radio"
                  onChange={() => setPayment("mastercard")}
                  name="payment"
                  value="mastercard"
                />
              </label>
              <label className={styles.modal_payment_label}>
                <p>Добавить карту</p>
                <span>+</span>
              </label>
              <label className={styles.modal_confirm_label}>
                <input
                  type="checkbox"
                  name="confirm"
                  onChange={(e) => setConfirm(e.target.checked)}
                  checked={confirm}
                />{" "}
                <p>Я хочу получить чек</p>
              </label>
              <button
                disabled={
                  sum.split(" ₽").join(" ").split(" ").join("") == "0" ||
                  sum.split(" ₽").join(" ").split(" ").join("") <= "100" ||
                  payment == false
                }
                className={styles.modal_button}
                onClick={() => setConfirm(true)}
                type="submit"
              >
                Отправить на вывод
              </button>
              <p>
                Нажимая кнопку, я соглашаюсь с условиями{" "}
                <a href="">Политики конфиденциальности</a>, за исключением
                связанных с рекламой условий, которые действуют только при даче
                согласия на рекламу
              </p>
            </form>
          </div>
        </div>
      )}
      {isOpen == 2 && (
        <div className={styles.modal}>
          <div className={styles.modal_body}>
            <h1 className={styles.modal_title}>Заявка на вывод отправлена</h1>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.modal_closeButton}
            >
              &times;
            </button>
            <p style={{ textAlign: "center", maxWidth: "100%" }}>
              Деньги будут зачислены в течение 24 часов.
            </p>
          </div>
        </div>
      )}
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
