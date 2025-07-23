import { TbCoins } from "react-icons/tb";
import styles from "./Monitor.module.scss";
import { CiInboxOut } from "react-icons/ci";
import { NumericFormat } from "react-number-format";
import { Loading } from "../../../widgets/Loading/Loading";
import { useEffect, useState } from "react";

export const Monitor = () => {
  const [loading, setLoading] = useState(false);
  const totalCash = 10000000;
  const totalWithdrawal = 1000000;

  useEffect(() => {
    setLoading(true);
    // Simulate an API call to fetch data
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second delay
  }, []);

  return (
    <div className={styles.monitor}>
      {loading && <Loading />}

      <h1 className={styles.monitor_title}>Мониторинг системы</h1>
      <div className={styles.monitor_top}>
        <div className={styles.monitor_top_item}>
          <p>
            <TbCoins />
            Общая сумма взносов
          </p>

          <NumericFormat
            value={totalCash}
            displayType="text"
            thousandSeparator=" "
            suffix=" ₽"
            decimalSeparator=","
          />
        </div>{" "}
        <div className={styles.monitor_top_item}>
          <p>
            <CiInboxOut />
            Общая сумма средств к выводу
          </p>
          <NumericFormat
            value={totalWithdrawal}
            displayType="text"
            thousandSeparator=" "
            decimalSeparator=","
            suffix=" ₽"
          />
        </div>
      </div>
    </div>
  );
};
