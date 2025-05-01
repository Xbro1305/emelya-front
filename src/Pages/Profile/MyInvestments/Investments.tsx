import styles from "./Investments.module.scss";

export const MyInvestments = () => {
  return (
    <div className={styles.investment}>
      <h1 className={styles.investment_title}>Мои инвестиции</h1>
      {investmentInfo?.plan ? (
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

const investmentInfo:
  | {
      plan: string;
      sum: string;
      percent: string;
      date: string;
    }
  | any = {
  // id: 1,
  // plan: "Легкий старт",
  // sum: "100 000 ₽",
  // percent: "80 ₽",
  // date: "14.04.25-14.02.26",
};

const incomings: { id: number; date: string; sum: string }[] = [
  // { id: 1, date: "14.04.25", sum: "4 000 ₽" },
  // { id: 2, date: "14.04.25", sum: "4 000 ₽" },
  // { id: 3, date: "14.04.25", sum: "4 000 ₽" },
];
