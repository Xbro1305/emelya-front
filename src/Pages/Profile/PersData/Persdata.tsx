import { useEffect, useState } from "react";
import styles from "./PersData.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { Loading } from "../../../widgets/Loading/Loading";

export const PersData = () => {
  const [data, setData] = useState<{
    email: string;
    firstName: string;
    ID: number;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    lastName: string;
    login: string;
    passwordHash: string;
    patronymic: string;
    phone: string;
  }>({
    email: "string",
    firstName: "string",
    ID: 0,
    isEmailVerified: true,
    isPhoneVerified: true,
    lastName: "string",
    login: "string",
    passwordHash: "string",
    patronymic: "string",
    phone: "string",
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios(`${import.meta.env.VITE_APP_API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setData(res.data))
      .catch((err) => {
        const errorMesage = err.response.data.error || "Ошибка";
        toast.error(errorMesage);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      {loading && <Loading />}
      <div className={styles.persdata}>
        <h1>Здравствуйте, {data?.firstName}!</h1>
        <p>Имя: {data.firstName}</p>
        <p>Фамилия: {data.lastName}</p>
        <p>Отчество: {data.patronymic}</p>
        <p>E-mail: {data.email}</p>
        <p>Номер телефона: {data.phone}</p>
        <p>ID: {data.ID}</p>
        <p>Логин: {data.login}</p>
        <p>Пароль: {data.passwordHash}</p>
      </div>
    </>
  );
};
