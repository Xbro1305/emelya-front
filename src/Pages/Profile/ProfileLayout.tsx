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
import axios from "axios";
import { Loading } from "../../widgets/Loading/Loading";

export const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    axios(`${import.meta.env.VITE_API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data?.id) {
          setId(res.data.id);
        } else {
          localStorage.removeItem("token");
          navigate("/");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, navigate]);

  return (
    <>
      {loading && <Loading />}
      <Header
        isOpen={isOpen}
        id={id}
        setIsOpen={setIsOpen}
        navigate={(url) => navigate(url)}
      />
      <div className={styles.profile}>
        <Sidebar expanded={expanded} setExpanded={setExpanded} />

        <div
          style={{
            width: expanded ? "calc(100% - 330px)" : "calc(100% - 50px)",
            overflowY: "auto",
            paddingBottom: "100px",
            background: "black",
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
  id,
  setIsOpen,
  navigate,
}: {
  isOpen: boolean;
  id: number;
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
        <p>ID {id}</p>
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
              to={PATHS.PARTNERS}
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
                <Link to="https://www.cbr.ru/finorg/foinfo/?ogrn=1247700635478">
                  © ООО МКК "Гранат", <br /> ИНН 7733455259, ОГРН 1247700635478
                </Link>
              </span>
              <span>
                125424, город Москва, Волоколамское ш, д. 108, помещ. 8ц
              </span>
            </div>
            <div>
              <section>
                <span>Мы в соцсетях:</span>
                <Link to="https://t.me/emelyazaym">
                  <img src={footerLogo1} alt="" />
                </Link>
                <Link to="https://vk.com/emelyazaym">
                  <img src={footerLogo2} alt="" />
                </Link>
                <Link to="https://ok.ru/group/70000034587968">
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
        <Link to={PATHS.PARTNERS}>
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
            <Link to="https://t.me/emelyazaym">
              <img src={footerLogo1} alt="" />
            </Link>
            <Link to="https://vk.com/emelyazaym">
              <img src={footerLogo2} alt="" />
            </Link>
            <Link to="https://ok.ru/group/70000034587968">
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
