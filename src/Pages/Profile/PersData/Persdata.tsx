import { useEffect, useState } from "react";
import styles from "./PersData.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { Loading } from "../../../widgets/Loading/Loading";

export const PersData = () => {
  const [data, setData] = useState<{
    Email: string;
    FirstName: string;
    ID: number;
    IsEmailVerified: boolean;
    IsPhoneVerified: boolean;
    LastName: string;
    Login: string;
    Patronymic: string;
    Phone: string;
  }>({
    Email: "Загрузка...",
    FirstName: "Загрузка...",
    ID: 32,
    IsEmailVerified: false,
    IsPhoneVerified: true,
    LastName: "Загрузка...",
    Login: "Загрузка...",
    Patronymic: "Загрузка...",
    Phone: "Загрузка...",
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
        <h1>Здравствуйте, {data?.FirstName}!</h1>
        <p>Имя: {data.FirstName}</p>
        <p>Фамилия: {data.LastName}</p>
        <p>Отчество: {data.Patronymic}</p>
        <p>E-mail: {data.Email}</p>
        <p>Номер телефона: {data.Phone}</p>
        <p>ID: {data.ID}</p>
        <p>Логин: {data.Login}</p>
      </div>
    </>
  );
};
