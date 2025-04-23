import styles from "./Investments.module.scss";

export const MyInvestments = () => {
  return (
    <div className={styles.investment}>
      <h1 className={styles.investment_title}>Мои инвестиции</h1>
      <div className={styles.investment_top_table}>
        <div className={styles.investment_top_table_body}>
          <div className={styles.investment_top_table_item}>
            <p>Тарифный план</p>
            <p>Легкий старт</p>
          </div>
          <div className={styles.investment_top_table_item}>
            <p>Сумма на счету</p>
            <p>100 000 ₽</p>
          </div>
          <div className={styles.investment_top_table_item}>
            <p>% за день</p>
            <p>80 ₽</p>
          </div>
          <div className={styles.investment_top_table_item}>
            <p>Дата начала/окончания</p>
            <p>14.04.25-14.02.26</p>
          </div>
        </div>
        <button className={styles.investment_investButton}>
          Инвестировать
        </button>
      </div>
      <p>Поступление платежей:</p>
      <div className={styles.investment_table}>
        <div className={styles.investment_table_top}>
          <p>Дата</p>
          <p>Сумма платежа</p>
        </div>
        <div className={styles.investment_table_body}>
          <div className={styles.investment_table_item}>
            <p>14.04.25</p>
            <p>4 000 ₽</p>
          </div>
          <div className={styles.investment_table_item}>
            <p>14.04.25</p>
            <p>4 000 ₽</p>
          </div>
          <div className={styles.investment_table_item}>
            <p>14.04.25</p>
            <p>4 000 ₽</p>
          </div>
        </div>
      </div>
    </div>
  );
};
