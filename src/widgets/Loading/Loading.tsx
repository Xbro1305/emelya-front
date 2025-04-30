import styles from "./Loading.module.scss";

export const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}>
        <div className={styles.loader__dot}></div>
        <div className={styles.loader__dot}></div>
        <div className={styles.loader__dot}></div>
      </div>
      <p>Загрузка...</p>
    </div>
  );
};
