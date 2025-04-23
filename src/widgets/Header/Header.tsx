import styles from "./Header.module.scss";
import logo from "../../assets/logo.svg";
import logoText from "../../assets/logo-text.svg";
import { Link, useNavigate } from "react-router-dom";
import key from "../../assets/Vector-header_key.svg";
import { useEffect, useState } from "react";
import logo1 from "../../assets/Vectorheader-1.svg";
import logo2 from "../../assets/Vectorheader-2.svg";
import { IoMdClose } from "react-icons/io";
import { PatternFormat } from "react-number-format";

export const Header = () => {
  const [logoSize, setLogoSize] = useState(120);
  const [isOpen, setIsOpen] = useState(false);
  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false);
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const newSize = Math.max(80, 120 - (scrollTop / 100) * 10);
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
            <Link
              onClick={() => setIsInvestorModalOpen(true)}
              className={styles.header_forInvestors}
              to={"/"}
            >
              Инвесторам
            </Link>
            <Link
              className={styles.header_login}
              to={"#"}
              onClick={() => setIsInvestorModalOpen(true)}
            >
              Войти
            </Link>
          </section>
          <section className={styles.header_tablet}>
            <Link
              className={styles.header_login}
              to={"#"}
              onClick={() => setIsInvestorModalOpen(true)}
            >
              <img src={logo1} alt="" />
            </Link>{" "}
            <Link className={styles.header_login} to={"tel:88006005156"}>
              <img src={logo2} alt="" />
            </Link>
            <Link
              className={styles.header_login}
              to={"#"}
              onClick={() => setIsInvestorModalOpen(true)}
            >
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
        <Link
          className={styles.header_login}
          to={""}
          onClick={() => setIsInvestorModalOpen(true)}
        >
          <img src={logo1} alt="" />
        </Link>{" "}
        <Link className={styles.header_login} to={"tel:88006005156"}>
          <img src={logo2} alt="" />
        </Link>
        <Link
          className={styles.header_login}
          to={"#"}
          onClick={() => setIsInvestorModalOpen(true)}
        >
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

      {isInvestorModalOpen && (
        <div className={styles.investor}>
          <div className={styles.investor_body}>
            <h1 className={styles.investor_title}>Регистрация</h1>
            <button
              className={styles.investor_closeButton}
              onClick={() => setIsInvestorModalOpen(false)}
            >
              <IoMdClose style={{ width: "100%", height: "100%" }} />
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsInvestorModalOpen(false);
                localStorage.setItem(
                  "data",
                  JSON.stringify({ surname, name, patronymic, email, phone })
                );
                localStorage.setItem("profileType", "investor");
                localStorage.setItem("token", "investor");
                navigate("/profile");
              }}
              className={styles.investor_form}
            >
              <label className={styles.investor_form_label}>
                <p>Фамилия:</p>
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </label>
              <label className={styles.investor_form_label}>
                <p>Имя:</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className={styles.investor_form_label}>
                <p>Отчество:</p>
                <input
                  type="text"
                  value={patronymic}
                  onChange={(e) => setPatronymic(e.target.value)}
                />
              </label>
              <label className={styles.investor_form_label}>
                <p>Электронная почта:</p>
                <span>Необходимо будет подтверждение почты</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className={styles.investor_form_label}>
                <p>Телефон:</p>
                <span>Необходимо подтверждение по СМС</span>
                <PatternFormat
                  format="+7 ### ### ## ##"
                  mask=" "
                  allowEmptyFormatting
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <label className={styles.investor_form_confirm}>
                <input
                  type="checkbox"
                  checked={confirm}
                  onChange={(e) => setConfirm(e.target.checked)}
                />
                <p>
                  Я согласен с{" "}
                  <a href="#">условиями обработки персональных данных</a> и{" "}
                  <a href="#">пользовательским соглашением</a>
                </p>
              </label>
              <button
                disabled={
                  !surname ||
                  !name ||
                  !patronymic ||
                  !email ||
                  !phone ||
                  !confirm
                }
                type="submit"
              >
                Продолжить
              </button>
              <label className={styles.investor_form_confirm}>
                <p>
                  {" "}
                  Нажимая кнопку, я соглашаюсь с условиями{" "}
                  <a href="/">Политики конфиденциальности</a> , за исключением
                  связанных с рекламой условий, которые действуют только при
                  даче согласия на рекламу
                </p>
              </label>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
