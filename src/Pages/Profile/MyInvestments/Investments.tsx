import { useEffect, useState } from "react";
import styles from "./Investments.module.scss";
import axios from "axios";
import { Loading } from "../../../widgets/Loading/Loading";

export const MyInvestments = () => {
  const [loading, setLoading] = useState(true);

  const [balance, setBalance] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios(`${import.meta.env.VITE_APP_API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data?.ID) {
          setBalance(res.data.balance);
          res.data?.ID == 3 && setBalance(100000);
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function getDateRangeToNextYear() {
    const today = new Date();

    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);

    const format = (date: any) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(2);
      return `${day}.${month}.${year}`;
    };

    return `${format(today)}-${format(nextYear)}`;
  }

  const investmentInfo:
    | {
        plan: string;
        sum: string;
        percent: string;
        date: string;
      }
    | any = {
    id: 1,
    plan:
      balance <= 500000
        ? "Легкий старт"
        : balance < 1000000
        ? "Триумф"
        : "Максимум",
    sum: `${balance}  ₽`,
    percent:
      balance <= 500000
        ? "0.8% / день"
        : balance < 1000000
        ? "0.9% / день"
        : "1.0% / день",
    date: getDateRangeToNextYear(),
  };
  return (
    <div className={styles.investment}>
      {loading && <Loading />}
      <h1 className={styles.investment_title}>Мои инвестиции</h1>
      {investmentInfo?.plan && balance ? (
        <div className={styles.investment_top_table}>
          <div className={styles.investment_top_table_body}>
            <div className={styles.investment_top_table_item}>
              <p>Тарифный план</p>
              <p>{investmentInfo.plan}</p>
            </div>
            <div className={styles.investment_top_table_item}>
              <p>Сумма на счету</p>
              <p>{investmentInfo.sum}</p>
            </div>
            <div className={styles.investment_top_table_item}>
              <p>% за день</p>
              <p>{investmentInfo.percent}</p>
            </div>
            <div className={styles.investment_top_table_item}>
              <p>Дата начала/окончания</p>
              <p>{investmentInfo.date}</p>
            </div>
          </div>
          <button className={styles.investment_investButton}>
            Инвестировать
          </button>
        </div>
      ) : (
        <div className={styles.investment_top_table_empty}>
          <p>Вы пока не инвестировали</p>
        </div>
      )}
      <p>Поступление платежей:</p>
      {incomings.length == 0 ? (
        <div className={styles.investment_table_empty}>
          <p>Нет данных</p>
        </div>
      ) : (
        <div className={styles.investment_table}>
          <div className={styles.investment_table_top}>
            <p>Дата</p>
            <p>Сумма платежа</p>
          </div>
          <div className={styles.investment_table_body}>
            {incomings?.map((item) => (
              <div key={item.id} className={styles.investment_table_item}>
                <p>{item.date}</p>
                <p>{item.sum}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const incomings: { id: number; date: string; sum: string }[] = [
  // { id: 1, date: "14.04.25", sum: "4 000 ₽" },
  // { id: 2, date: "14.04.25", sum: "4 000 ₽" },
  // { id: 3, date: "14.04.25", sum: "4 000 ₽" },
];
