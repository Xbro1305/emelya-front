import { NumericFormat } from "react-number-format";
import styles from "./SearchById.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Loading } from "../../../widgets/Loading/Loading";
import { FaSearch } from "react-icons/fa";

interface User {
  ID: number;
  Login: string;
  FirstName: string;
  LastName: string;
  Patronymic: string;
  Phone: string;
  Email: string;
  role: string;
  balance?: number | null;
}

export const SearchById = () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    axios(`${baseUrl}/admin/user/search-id?id=${id} `, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => setUsers([res.data]))
      .catch(() => toast.error("Пользователь не найден!"))
      .finally(() => setLoading(false));
  };
  return (
    <div className={styles.searchById}>
      {loading && <Loading />}
      <section className={styles.searchById_header}>
        <h1 className={styles.searchById_header_title}>Поиск по ID</h1>
        <form onSubmit={handleSearch}>
          <NumericFormat
            className={styles.searchById_input}
            placeholder="Введите ID"
            allowNegative={false}
            name="id"
            prefix="ID: "
            onValueChange={(values) => {
              const { value } = values;
              setId(value);
            }}
          />

          <button
            style={{
              maxWidth: id ? "100px" : "0px",
            }}
            className={styles.searchById_button}
            type="submit"
          >
            <FaSearch />
          </button>
        </form>
      </section>

      {users.length > 0 && (
        <div className={styles.searchById_bottom}>
          <div className={styles.searchById_bottom_table}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Логин</th>
                  <th>Имя</th>
                  <th>Фамилия</th>
                  <th>Отчество</th>
                  <th>Телефон</th>
                  <th>Email</th>
                  <th>Роль</th>
                  <th>Баланс</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr
                    onClick={() => navigate(`/admin/user/${user.ID}`)}
                    key={user.ID}
                  >
                    <td>{user.ID}</td>
                    <td>{user.Login}</td>
                    <td>{user.FirstName}</td>
                    <td>{user.LastName}</td>
                    <td>{user.Patronymic}</td>
                    <td>{user.Phone}</td>
                    <td>{user.Email}</td>
                    <td>{user.role}</td>
                    <td>
                      {user.balance ? (
                        <NumericFormat
                          value={user.balance}
                          displayType="text"
                          thousandSeparator=" "
                          decimalSeparator=","
                          suffix=" ₽"
                        />
                      ) : (
                        "Нет данных"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
