import styles from "./Header.module.scss";
import logo from "../../assets/logo.svg";
import logoText from "../../assets/logo-text.svg";
import { Link } from "react-router-dom";
import key from "../../assets/Vector-header_key.svg";
import { useEffect, useState } from "react";
import logo1 from "../../assets/Vectorheader-1.svg";
import logo2 from "../../assets/Vectorheader-2.svg";
import { IoMdClose } from "react-icons/io";

export const Header = () => {
  const [logoSize, setLogoSize] = useState(120); // Boshlang‘ich o‘lcham
  const [isOpen, setIsOpen] = useState(false); // Mobil menyu holati

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const newSize = Math.max(80, 120 - (scrollTop / 100) * 10); // Animatsiya formulasi
      setLogoSize(newSize);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <header className={styles.header}>
        <section className={styles.header_logo}>
          <img
            style={{
              height: `${logoSize}px`,
              transition: "width 0.1s ease-out",
              objectFit: "cover",
            }}
            src={logo}
            alt=""
          />
          <img
            style={{
              width: `${logoSize}px`,
              transition: "width 0.1s ease-out",
            }}
            src={logoText}
            alt=""
          />
        </section>
        <div className={styles.header_right}>
          <Link to={"/"} className={styles.header_right_item}>
            Получить заем
          </Link>
          <Link to={"/"} className={styles.header_right_item}>
            Погасить заем
          </Link>
          <Link to={"/"} className={styles.header_right_item}>
            О сервисе
          </Link>
          <Link to={"/"} className={styles.header_right_item}>
            Лицензия ЦБ
          </Link>
          <Link to={"/"} className={styles.header_right_item}>
            СМИ о нас
          </Link>
          <Link to={"tel:88006005156"} className={styles.header_right_phone}>
            <img src={logo2} alt="" />
            <p>
              8 800 600 51 56
              <span>Многоканальный</span>
            </p>
          </Link>
          <section
            className={styles.header_desktop}
            style={{ display: "flex", gap: "20px" }}
          >
            {" "}
            <Link className={styles.header_forInvestors} to={"/"}>
              Инвесторам
            </Link>
            <Link className={styles.header_login} to={"/login"}>
              Войти
            </Link>
          </section>
          <section className={styles.header_tablet}>
            <Link className={styles.header_login} to={"/login"}>
              <img src={logo1} alt="" />
            </Link>{" "}
            <Link className={styles.header_login} to={"tel:88006005156"}>
              <img src={logo2} alt="" />
            </Link>
            <Link className={styles.header_login} to={"/login"}>
              <img src={key} alt="" />
            </Link>
          </section>
          <button className={styles.header_burger}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      <div className={styles.mob_header}>
        <section className={styles.header_logo}>
          <img
            style={{
              height: `${logoSize * 0.9}px`,
              transition: "width 0.1s ease-out",
              objectFit: "cover",
            }}
            src={logo}
            alt=""
          />
          <img src={logoText} alt="" />
        </section>
        <Link className={styles.header_login} to={"/login"}>
          <img src={logo1} alt="" />
        </Link>{" "}
        <Link className={styles.header_login} to={"tel:88006005156"}>
          <img src={logo2} alt="" />
        </Link>
        <Link className={styles.header_login} to={"/login"}>
          <img src={key} alt="" />
        </Link>
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
            <Link to={"/"} className={styles.header_right_item}>
              Получить заем
            </Link>
            <Link to={"/"} className={styles.header_right_item}>
              Погасить заем
            </Link>
            <Link to={"/"} className={styles.header_right_item}>
              О сервисе
            </Link>
            <Link to={"/"} className={styles.header_right_item}>
              Лицензия ЦБ
            </Link>
            <Link to={"/"} className={styles.header_right_item}>
              СМИ о нас
            </Link>{" "}
          </div>
        </div>
      )}
    </>
  );
};
