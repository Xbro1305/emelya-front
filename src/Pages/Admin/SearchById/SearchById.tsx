import { NumericFormat } from "react-number-format";
import styles from "./SearchById.module.scss";

export const SearchById = () => {
  return (
    <div className={styles.searchById}>
      <section className={styles.searchById_header}>
        <h1 className={styles.searchById_header_title}>Поиск по ID</h1>
        <div>
          <NumericFormat
            className={styles.searchById_input}
            placeholder="Введите ID"
            allowNegative={false}
            prefix="ID: "
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              console.log(value, formattedValue);
            }}
          />
        </div>
      </section>
    </div>
  );
};
