import { useEffect, useState } from "react";
import styles from "./Operations.module.scss";
import { FaChevronDown } from "react-icons/fa";
import { NumericFormat, PatternFormat } from "react-number-format";
import { BiCard, BiLogoMastercard, BiLogoVisa } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdCard } from "react-icons/io";

export const Operations = () => {
  const [active, setActive] = useState<false | number>(false);
  const [isOpen, setIsOpen] = useState<false | number>(false);
  const [limit, setLimit] = useState(0);
  const [sum, setSum] = useState<string>("0");
  const [payment, setPayment] = useState<false | string>(false);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cardNumber, setCardNumber] = useState<string | null>(null);

  useEffect(() => {
    setLimit(0);
  }, []);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // if (!token) {
    //   navigate("/");
    //   return;
    // }
    axios(`${import.meta.env.VITE_APP_API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setCardNumber(res.data.CardNumber);
      })
      .catch(() => {
        // localStorage.removeItem("token");
        // navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, navigate]);

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

      {data.length ? (
        <div className={styles.operations_table}>
          <div className={styles.operations_table_top}>
            <p>Вид</p>
            <p>Сумма</p>
            <p>Время</p>
            <p>Дата</p>
          </div>
          <div className={styles.operations_table_body}>
            {data?.map(
              (item: {
                id: number;
                type: string;
                sum: string;
                time: string;
                date: string;
              }) => (
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
              )
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>Нет данных</p>
        </div>
      )}
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
              {cardNumber && (
                <label className={styles.modal_payment_label}>
                  <p>
                    <IoMdCard /> ****{cardNumber?.slice(12)}
                  </p>
                  <input
                    type="radio"
                    onChange={() => setPayment(cardNumber)}
                    name="payment"
                    value={cardNumber}
                  />
                </label>
              )}
              <label
                onClick={() => setIsOpen(3)}
                className={styles.modal_payment_label}
              >
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
      {isOpen == 3 && (
        <div className={styles.modal}>
          <div className={styles.modal_body}>
            <h1 className={styles.modal_title}>Введите номер карты</h1>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.modal_closeButton}
            >
              &times;
            </button>
            <label className={styles.modal_input_label}>
              <p>Номер карты:</p>
              <PatternFormat format="#### #### #### ####" />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

const data:
  | {
      id: number;
      type: string;
      sum: string;
      time: string;
      date: string;
    }
  | any = [
  // {
  //   id: 1,
  //   type: "Пополнение",
  //   sum: "10 000 ₽",
  //   time: "12:00",
  //   date: "12.12.2023",
  // },
  // {
  //   id: 2,
  //   type: "Пополнение",
  //   sum: "10 000 ₽",
  //   time: "12:00",
  //   date: "12.12.2023",
  // },
];
