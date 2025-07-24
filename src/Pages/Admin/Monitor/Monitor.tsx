import { TbCoins } from "react-icons/tb";
import styles from "./Monitor.module.scss";
import { CiInboxOut } from "react-icons/ci";
import { NumericFormat } from "react-number-format";
import { Loading } from "../../../widgets/Loading/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface User {
  CardNumber: string | null;
  Email: string;
  FirstName: string;
  ID: number;
  IsEmailVerified: boolean;
  IsPhoneVerified: boolean;
  LastName: string;
  Login: string;
  PasswordHash: string;
  Patronymic: string;
  Phone: string;
  ReferrerID: number | null;
  balance: number | null;
  role: string;
}

export const Monitor = () => {
  const [loading, setLoading] = useState(false);
  const [totalCash, setTotalCash] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const navigate = useNavigate();

  useEffect(() => {
    axios(`${baseUrl}/admin/reward/total-available`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => setTotalWithdrawal(res.data.total_available))
      .catch((error) =>
        toast.error("Ошибка при загрузке данных монитора: " + error.message)
      );

    ///api/admin/deposit/total-approved-amount
    axios(`${baseUrl}/admin/deposit/total-approved-amount`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => setTotalCash(res.data.total_approved_amount))
      .catch((error) =>
        toast.error("Ошибка при загрузке данных взносов: " + error.message)
      );

    axios(`${baseUrl}/admin/user/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) =>
        setUsers(
          res.data
            .sort((a: User, b: User) => b.ID - a.ID)
            .slice(0, 20)
            .map((user: User) => ({
              ...user,
              balance: user.balance || 0,
            }))
        )
      )
      .catch((error) =>
        toast.error(
          "Ошибка при загрузке данных пользователей: " + error.message
        )
      )
      .finally(() => setLoading(false));
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
      <div className={styles.monitor_bottom}>
        <h2 className={styles.monitor_subtitle}>Регистрации</h2>
        <div className={styles.monitor_bottom_table}>
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
              {users.map((user) => (
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
    </div>
  );
};
