import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/SideBar";
import styles from "./AdminLayout.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../../../widgets/Loading/Loading";
import { toast } from "react-toastify";

export const AdminLayout = () => {
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    axios(`${baseUrl}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.data.role !== "admin") {
          localStorage.removeItem("token");
          window.location.href = "/";
          toast.error("Вы не админ!")
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.adminLayout}>
      {loading && <Loading />}
      <Sidebar />
      <div className={styles.adminLayout_outlet}>
        <Outlet />
      </div>
    </div>
  );
};
