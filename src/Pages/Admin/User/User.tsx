import { useParams } from "react-router-dom";
import styles from "./User.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../../../widgets/Loading/Loading";
import { NumericFormat, PatternFormat } from "react-number-format";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

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
  balance: number;
  role: string;
}

interface Deposit {
  id: number;
  user_id: number;
  amount: number;
  created_at: string;
  approved_at?: string;
  block_until: string;
  daily_reward?: number;
  status: string;
}

interface Withdrawal {
  id: number;
  user_id: number;
  amount: number;
  created_at: string;
  approved_at?: string;
  status: string;
}

interface Reward {
  id: number;
  user_id: number;
  amount: number;
  created_at: string;
  type: string; // Adjust type as needed
}

export interface UserOperations {
  Deposits: Deposit[];
  Withdrawals: Withdrawal[]; // Adjust type as needed
  Rewards: any[]; // Adjust type as needed
}

export const User = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [patronymic, setPatronymic] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [tariffs, setTariffs] = useState<any[]>([]); // Adjust type as needed
  const [rewards, setRewards] = useState<Reward[]>([]); // Adjust type as needed
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);

  const baseUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    axios(`${baseUrl}/admin/user/search-id?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setUser(res.data);
        setName(res.data.FirstName);
        setSurname(res.data.LastName);
        setPatronymic(res.data.Patronymic);
        setEmail(res.data.Email);
        setPhone(res.data.Phone);
      })
      .catch((error) => console.error("Error fetching user data:", error))
      .finally(() => setLoading(false));

    axios(`${baseUrl}/admin/tariffs`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => setTariffs(res.data))
      .catch((error) => {
        console.error("Error fetching tariffs:", error);
        toast.error("Ошибка при загрузке тарифов");
      });

    // /api/admin/deposit/by-user

    // /api/admin / user / operations;

    axios(`${baseUrl}/admin/user/operations?user_id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setDeposits(res.data.Deposits || []);
        setWithdrawals(res.data.Withdrawals || []);
        setRewards(res.data.Rewards || []);
      })
      .catch((error) => {
        console.error("Error fetching user operations:", error);
        toast.error("Ошибка при загрузке операций пользователя");
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    //   "card_number": "string",
    // "first_name": "string",
    // "last_name": "string",
    // "patronymic": "string",
    // "phone": "string",

    const data = {
      first_name: name,
      last_name: surname,
      patronymic: patronymic,
      email: email,
      phone: phone,
      user_id: Number(id),
    };

    axios(`${baseUrl}/admin/user/update-profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data,
    })
      .then(() => toast.success("Пользователь успешно обновлен"))
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Ошибка при обновлении пользователя");
      })
      .finally(() => setLoading(false));
  };

  const addDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);

    const block_until = new Date(formData.get("block_until") as string);

    block_until.setDate(
      block_until.getDate() +
        ((formData.get("block_duration") as string)
          ? parseInt(formData.get("block_duration") as string, 10)
          : 300) // Default to 300 days if not provided
    );

    // {
    //   "approved_at": "string",
    //   "created_at": "string",
    //   "daily_reward": 0,
    // }

    const data = {
      amount: Number(
        (formData.get("amount") as string)?.split(" ₽")[0].replace(/\s/g, "")
      ),
      block_until,
      tariff_id: parseInt(formData.get("tariff_id") as string, 10),
      daily_reward: Number(
        (formData.get("daily_reward") as string)
          .split(" ₽")[0]
          .replace(/\s/g, "")
      ),
      created_at: (formData.get("block_until") as string) + "T00:00:00.000Z",
      approved_at: (formData.get("block_until") as string) + "T00:00:00.000Z",
    };

    axios(`${baseUrl}/admin/deposit/create?user_id=${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data,
    })
      .then(() => {
        toast.success("Взнос успешно добавлен");
        setCurrentModal(null);
      })
      .catch((error) => {
        console.error("Error adding deposit:", error);
        toast.error("Ошибка при добавлении взноса");
      })
      .finally(() => setLoading(false));
  };

  const addReferal = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const referralId = formData.get("referral_id") as string;

    axios(`${baseUrl}/admin/user/add-referal`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: {
        referrer_id: parseInt(referralId, 10),
        user_id: id ? parseInt(id) : 0,
      },
    })
      .then(() => {
        toast.success("Реферал успешно добавлен");
        setCurrentModal(null);
      })
      .catch((error) => {
        console.error("Error adding referral:", error);
        toast.error("Ошибка при добавлении реферала");
      })
      .finally(() => setLoading(false));
  };

  const accrualOfIncome = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      amount: Number(
        (formData.get("income_amount") as string)
          .split(" ₽")[0]
          .replace(/\s/g, "")
      ),
      user_id: id ? parseInt(id) : 0,
      created_at: new Date(
        formData.get("operation_date") as string
      ).toISOString(),
      referral_id: parseInt(formData.get("referral_id") as string, 10),
    };

    axios(`${baseUrl}/admin/reward/referral-income`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data,
    })
      .then(() => {
        toast.success("Доход от реферала успешно начислен");
        setCurrentModal(null);
      })
      .catch((error) => {
        console.error("Error accruing income:", error);
        toast.error("Ошибка при начислении дохода от реферала");
      })
      .finally(() => setLoading(false));
  };

  const deleteDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const depositId = formData.get("deposit_id") as string;

    axios(`${baseUrl}/admin/deposit/delete?deposit_id=${depositId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        toast.success("Взнос успешно удален");
        setCurrentModal(null);
      })
      .catch((error) => {
        console.error("Error deleting deposit:", error);
        toast.error("Ошибка при удалении взноса");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.user}>
      {loading && <Loading />}
      <div className={styles.user_top}>
        <h1 className={styles.user_title}>Пользователь ID: {user?.ID}</h1>
        <form>
          <div className={styles.user_field}>
            <label>Имя:</label>
            <input
              type="text"
              defaultValue={user?.FirstName || ""}
              onChange={(e) => setName(e.target.value)}
              name="FirstName"
            />
          </div>
          <div className={styles.user_field}>
            <label>Фамилия:</label>
            <input
              type="text"
              defaultValue={user?.LastName || ""}
              onChange={(e) => setSurname(e.target.value)}
              name="LastName"
            />
          </div>
          <div className={styles.user_field}>
            <label>Отчество:</label>
            <input
              type="text"
              defaultValue={user?.Patronymic || ""}
              onChange={(e) => setPatronymic(e.target.value)}
              name="Patronymic"
            />
          </div>
          <div className={styles.user_field}>
            <label>Email:</label>
            <input
              type="email"
              defaultValue={user?.Email || ""}
              onChange={(e) => setEmail(e.target.value)}
              name="Email"
            />
          </div>
          <div className={styles.user_field}>
            <label>Телефон:</label>
            <PatternFormat
              format="+# (###) ###-##-##"
              value={user?.Phone || ""}
              onChange={(e) => {
                const { value } = e.target;
                setPhone(value.replace(/\D/g, "")); // Store only digits
              }}
              name="Phone"
            />
          </div>
          <div className={styles.user_field}>
            <label>&nbsp;</label>
            <button
              type="submit"
              disabled={
                name === user?.FirstName &&
                surname === user?.LastName &&
                patronymic === user?.Patronymic &&
                email === user?.Email &&
                phone === user?.Phone
              }
              onClick={handleSubmit}
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
      <div className={styles.user_options}>
        <button onClick={() => setCurrentModal("addDeposit")}>
          Добавить взнос
        </button>
        {/* <button onClick={() => setCurrentModal("addWithdraw")}>
          Вывод средств
        </button> */}
        <button onClick={() => setCurrentModal("accrualOfIncome")}>
          Доход от реферала
        </button>
        <button onClick={() => setCurrentModal("addReferal")}>
          Добавить реферала
        </button>
        <button onClick={() => setCurrentModal("deleteDeposit")}>
          Удалить взнос
        </button>
        {/* <button onClick={() => setCurrentModal("investLogs")}>
          Лог операций инвестора
        </button> */}
      </div>

      <div className={styles.user_bottom}>
        <div className={styles.user_bottom_section}>
          <h2 className={styles.user_subtitle}>Депозиты</h2>
          <div className={styles.user_bottom_table}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Сумма</th>
                  <th>Дата создания</th>
                  <th>Дата блокировки</th>
                  <th>Дневное вознаграждение</th>
                </tr>
              </thead>
              <tbody>
                {deposits?.map((deposit) => (
                  <tr key={deposit.id}>
                    <td>{deposit.id}</td>
                    <td>
                      <NumericFormat
                        value={deposit.amount}
                        displayType="text"
                        thousandSeparator=" "
                        decimalSeparator=","
                        suffix=" ₽"
                      />
                    </td>
                    <td>{new Date(deposit.created_at).toLocaleDateString()}</td>
                    <td>
                      {new Date(deposit.block_until).toLocaleDateString()}
                    </td>
                    <td>{deposit.daily_reward || 0} ₽</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.user_bottom_section}>
          <h2 className={styles.user_subtitle}>Вознаграждения</h2>
          <div className={styles.user_bottom_table}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Сумма</th>
                  <th>Дата начисления</th>
                  <th>Тип</th>
                </tr>
              </thead>
              <tbody>
                {rewards?.map((reward) => (
                  <tr key={reward.id}>
                    <td>{reward.id}</td>
                    <td>
                      <NumericFormat
                        value={reward.amount}
                        displayType="text"
                        thousandSeparator=" "
                        decimalSeparator=","
                        suffix=" ₽"
                      />
                    </td>
                    <td>{new Date(reward.created_at).toLocaleDateString()}</td>
                    <td>{reward.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* modals */}

      {currentModal != null && (
        <div className={styles.modal_wrapper}>
          <span
            onClick={() => setCurrentModal(null)}
            className={styles.modal_closeModal}
          ></span>
          <div className={styles.modal}>
            <button
              onClick={() => setCurrentModal(null)}
              className={styles.modal_close}
            >
              <MdClose />
            </button>
            {currentModal === "addDeposit" && (
              <>
                <h2>Добавить взнос</h2>
                <form onSubmit={addDeposit}>
                  <div className={styles.modal_field}>
                    <label>Сумма взноса:</label>
                    <NumericFormat
                      thousandSeparator=" "
                      decimalSeparator=","
                      placeholder="Введите сумму"
                      allowNegative={false}
                      suffix=" ₽"
                      name="amount"
                    />
                  </div>
                  <div className={styles.modal_field}>
                    <label>Дата взноса:</label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      min={new Date().toISOString().split("T")[0]}
                      name="block_until"
                    />
                  </div>
                  <div className={styles.modal_field}>
                    <label>Срок блокировки:</label>
                    <NumericFormat
                      placeholder="Введите срок блокировки в днях"
                      allowNegative={false}
                      suffix=" дней"
                      name="block_duration"
                    />
                  </div>
                  <div className={styles.modal_field}>
                    <label>Дневное вознаграждение</label>
                    <NumericFormat
                      placeholder="Введите дневное вознаграждение в рублях"
                      thousandSeparator=" "
                      allowNegative={false}
                      suffix=" ₽"
                      name="daily_reward"
                    />
                  </div>
                  <div className={styles.modal_field}>
                    <label>Выберите тариф:</label>
                    <select name="tariff_id">
                      {tariffs.map((tariff) => (
                        <option key={tariff.id} value={tariff.id}>
                          {tariff.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit">Сохранить</button>
                </form>
              </>
            )}
            {/* {currentModal === "addWithdraw" && (
              <>
                <h2>Вывод средств</h2>
                <form>
                  <div className={styles.modal_field}>
                    <label>Выберите идентификатор взноса:</label>
                    <select name="deposit_id">
                      <option value="1">Взнос 1</option>
                      <option value="2">Взнос 2</option>
                    </select>
                  </div>
                  <div className={styles.modal_field}>
                    <label>Сумма вывода:</label>
                    <NumericFormat
                      thousandSeparator=" "
                      decimalSeparator=","
                      placeholder="Введите сумму"
                      allowNegative={false}
                      suffix=" ₽"
                      name="withdraw_amount"
                    />
                  </div>
                  <div className={styles.modal_field}>
                    <label>Дата операции:</label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      min={new Date().toISOString().split("T")[0]}
                      name="operation_date"
                    />
                  </div>
                  <button type="submit">Сохранить</button>
                </form>
              </>
            )} */}
            {currentModal === "accrualOfIncome" && (
              <>
                <h2>Доход от реферала</h2>
                <form onSubmit={accrualOfIncome}>
                  <div className={styles.modal_field}>
                    <label>Сумма:</label>
                    <NumericFormat
                      thousandSeparator=" "
                      decimalSeparator=","
                      placeholder="Введите сумму"
                      allowNegative={false}
                      suffix=" ₽"
                      name="income_amount"
                    />
                  </div>
                  <div className={styles.modal_field}>
                    <label>Дата операции:</label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      // max={new Date().toISOString().split("T")[0]}
                      name="operation_date"
                    />
                  </div>
                  <div className={styles.modal_field}>
                    <label>ID реферала:</label>
                    <NumericFormat
                      placeholder="Введите ID реферала"
                      name="referral_id"
                    />
                  </div>
                  <button type="submit">Сохранить</button>
                </form>
              </>
            )}
            {currentModal === "addReferal" && (
              <>
                <h2>Добавить реферала</h2>

                <form onSubmit={addReferal}>
                  <div className={styles.modal_field}>
                    <label>ID реферала:</label>
                    <input
                      type="text"
                      placeholder="Введите ID реферала"
                      name="referral_id"
                    />
                  </div>
                  <button type="submit">Сохранить</button>
                </form>
              </>
            )}
            {currentModal === "deleteDeposit" && (
              <>
                <h2>Удалить взнос</h2>
                <form onSubmit={deleteDeposit}>
                  <div className={styles.modal_field}>
                    <label>Введите идентификатор взноса:</label>
                    <input type="text" name="deposit_id" id="" />
                  </div>
                  <button type="submit">Удалить</button>
                </form>
              </>
            )}
            {/* {currentModal === "investLogs" && (
              <>
                <h2>Лог операций инвестора</h2>
                <button onClick={() => setCurrentModal(null)}>Закрыть</button>
              </>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};
