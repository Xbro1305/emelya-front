import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.scss";
import { PATHS } from "../../../App";
import { MdOutlineMonitor } from "react-icons/md";
import logo from "../../../assets/logo.svg";
import logoText from "../../../assets/logo-text.svg";
import { FiList } from "react-icons/fi";
import { RiUserSearchLine } from "react-icons/ri";

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <section className={styles.sidebar_logo}>
        <img src={logo} alt="" />
        <img src={logoText} alt="" />
      </section>
      <div className={styles.sidebar_links}>
        <NavLink to={PATHS.ADMIN_MONITOR}>
          <MdOutlineMonitor />
          Монитор системы
        </NavLink>
        <NavLink to={PATHS.ADMIN_TARIFFS}>
          <FiList />
          Тарифы
        </NavLink>
        <NavLink to={PATHS.ADMIN_SEARCH_BY_ID}>
          <RiUserSearchLine />
          Поиск по ID
        </NavLink>
      </div>
    </div>
  );
};
