import styles from "./Profile.module.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import logo2 from "../../assets/Vectorheader-2.svg";
import logoText from "../../assets/logo-text.svg";
import { IoMdClose } from "react-icons/io";
import burgerIcon1 from "../../assets/burger- (4).svg";
import burgerIcon2 from "../../assets/burger- (1).svg";
import burgerIcon3 from "../../assets/burger- (5).svg";
import burgerIcon4 from "../../assets/burger- (6).svg";
import burgerIcon5 from "../../assets/burger- (7).svg";
import burgerIcon6 from "../../assets/burger- (3).svg";
import burgerIcon7 from "../../assets/burger- (2).svg";
import footerLogo1 from "../../assets/Subtract-footer_1.svg";
import footerLogo2 from "../../assets/Subtract-footer_2.svg";
import footerLogo3 from "../../assets/Subtract-footer_3.svg";
import footerLogo4 from "../../assets/Subtract-footer_4.svg";
import { FaChevronLeft } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { PATHS } from "../../App";

export const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate(PATHS.HOME);
    }
  }, [token, navigate]);

  return (
    <>
      <Header
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navigate={(url) => navigate(url)}
      />
      <div className={styles.profile}>
        <Sidebar expanded={expanded} setExpanded={setExpanded} />

        <div
          style={{
            width: expanded ? "calc(100% - 330px)" : "calc(100% - 50px)",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

const Header = ({
  isOpen,
  setIsOpen,
  navigate,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: (url: string) => void;
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.header_right}>
        <Link to={PATHS.HOME} className={styles.header_logo}>
          <img src={logo} alt="" />
          <img src={logoText} alt="" />
        </Link>
        <Link
          to={"tel:88006005156"}
          className={`${styles.header_right_phone} ${styles.mob_dn}`}
        >
          <img src={logo2} alt="" />
          <p>
            8 800 600 51 56
            <span>Многоканальный</span>
          </p>
        </Link>
      </div>
      <div className={styles.header_right}>
        <p>ID 89658345</p>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className={`${styles.header_logout} ${styles.mob_dn}`}
        >
          Выйти
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className={styles.header_burger}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      {isOpen && (
        <div className={styles.header_menu}>
          <div className={styles.header_menu_top}>
            <Link
              style={{ display: "flex !important" }}
              to={"tel:88006005156"}
              className={styles.header_right_phone}
            >
              <img src={logo2} alt="" />
              <p>
                8 800 600 51 56
                <span>Многоканальный</span>
              </p>
            </Link>
            <button onClick={() => setIsOpen(false)}>
              <IoMdClose />
            </button>
          </div>
          <div className={styles.header_menu_list}>
            <Link
              onClick={() => setTimeout(() => setIsOpen(false), 300)}
              to={PATHS.INVESTMENT_CONDITIONS}
            >
              <img src={burgerIcon1} alt="Условия" />
              Условия
            </Link>
            <Link
              onClick={() => setTimeout(() => setIsOpen(false), 300)}
              to={PATHS.MY_INVESTMENTS}
            >
              <img src={burgerIcon2} alt="Мои инвестиции" />
              Мои инвестиции
            </Link>
            <Link
              onClick={() => setTimeout(() => setIsOpen(false), 300)}
              to={PATHS.CALCULATOR}
            >
              <img src={burgerIcon3} alt="Калькулятор вкладов" />
              Калькулятор вкладов
            </Link>
            <Link
              onClick={() => setTimeout(() => setIsOpen(false), 300)}
              to={PATHS.OPERATIONS}
            >
              <img src={burgerIcon4} alt="Мои операции" />
              Мои операции
            </Link>
            <Link
              onClick={() => setTimeout(() => setIsOpen(false), 300)}
              to={"#"}
            >
              <img src={burgerIcon5} alt="Мои партнеры" />
              Мои партнеры
            </Link>
            <Link
              onClick={() => setTimeout(() => setIsOpen(false), 300)}
              to={"#"}
            >
              <img src={burgerIcon6} alt="Личные данные" />
              Личные данные
            </Link>
            <Link
              onClick={() => setTimeout(() => setIsOpen(false), 300)}
              to={"#"}
            >
              <img src={burgerIcon7} alt="Реквизиты" />
              Реквизиты
            </Link>
            <button
              className={styles.header_logout}
              onClick={() => {
                localStorage.removeItem("token");
                navigate(PATHS.HOME);
                setTimeout(() => setIsOpen(false), 300);
              }}
            >
              Выйти из профиля
            </button>
          </div>
          <footer className={styles.footer}>
            <div>
              <span>
                © ООО МКК "Гранат", <br /> ИНН 7733455259, ОГРН 1247700635478
              </span>
              <span>
                125424, город Москва, Волоколамское ш, д. 108, помещ. 8ц
              </span>
            </div>
            <div>
              <section>
                <span>Мы в соцсетях:</span>
                <Link to="/">
                  <img src={footerLogo1} alt="" />
                </Link>
                <Link to="/">
                  <img src={footerLogo2} alt="" />
                </Link>
                <Link to="/">
                  <img src={footerLogo3} alt="" />
                </Link>
                <Link to="/">
                  <img src={footerLogo4} alt="" />
                </Link>
              </section>
            </div>
          </footer>
        </div>
      )}
    </header>
  );
};

const Sidebar = ({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`${styles.profile_sidebar} ${
        expanded ? "" : styles.profile_sidebar_collapsed
      }`}
    >
      <div className={styles.header_menu_list}>
        <Link to={PATHS.INVESTMENT_CONDITIONS}>
          <img src={burgerIcon1} alt="Условия" />
          <p>Условия инвестиций</p>
        </Link>
        <Link to={PATHS.MY_INVESTMENTS}>
          <img src={burgerIcon2} alt="Мои инвестиции" />
          <p>Мои инвестиции</p>
        </Link>
        <Link to={PATHS.CALCULATOR}>
          <img src={burgerIcon3} alt="Калькулятор вкладов" />
          <p>Калькулятор вкладов</p>
        </Link>
        <Link to={PATHS.OPERATIONS}>
          <img src={burgerIcon4} alt="Мои операции" />
          <p>Мои операции</p>
        </Link>
        <Link to={"#"}>
          <img src={burgerIcon5} alt="Мои партнеры" />
          <p>Мои партнеры</p>
        </Link>
        <Link to={"#"}>
          <img src={burgerIcon6} alt="Личные данные" />
          <p>Личные данные</p>
        </Link>
        <Link to={"#"}>
          <img src={burgerIcon7} alt="Реквизиты" />
          <p>Реквизиты</p>
        </Link>
      </div>
      <footer className={styles.footer}>
        <div>
          <span>
            © ООО МКК "Гранат", <br /> ИНН 7733455259, ОГРН 1247700635478
          </span>
          <span>125424, город Москва, Волоколамское ш, д. 108, помещ. 8ц</span>
        </div>
        <div>
          <section>
            <span>Мы в соцсетях:</span>
            <Link to="/">
              <img src={footerLogo1} alt="" />
            </Link>
            <Link to="/">
              <img src={footerLogo2} alt="" />
            </Link>
            <Link to="/">
              <img src={footerLogo3} alt="" />
            </Link>
            <Link to="/">
              <img src={footerLogo4} alt="" />
            </Link>
          </section>
        </div>
      </footer>
      <button
        onClick={() => setExpanded(!expanded)}
        className={styles.profile_sidebar_btn}
      >
        <FaChevronLeft />
      </button>
    </div>
  );
};
