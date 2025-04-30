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
import { PATHS } from "../../App";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Loading } from "../Loading/Loading";

export const Header = () => {
  const [logoSize, setLogoSize] = useState(120);
  const [isOpen, setIsOpen] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [investorModal, setInvestorModal] = useState<false | string>(false);
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
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
      {waiting && <Loading />}
      <header className={styles.header}>
        <Link to={PATHS.HOME} className={styles.header_logo}>
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
        </Link>
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
              onClick={() => setInvestorModal("loginBySMS")}
              className={styles.header_forInvestors}
              to={localStorage.getItem("token") ? "/profile" : "#"}
            >
              Инвесторам
            </Link>
            <Link
              className={styles.header_login}
              to={localStorage.getItem("token") ? "/profile" : "#"}
              onClick={() => setInvestorModal("loginBySMS")}
            >
              Войти
            </Link>
          </section>
          <section className={styles.header_tablet}>
            <Link
              className={styles.header_login}
              to={localStorage.getItem("token") ? "/profile" : "#"}
              onClick={() => setInvestorModal("loginBySMS")}
            >
              <img src={logo1} alt="" />
            </Link>{" "}
            <Link className={styles.header_login} to={"tel:88006005156"}>
              <img src={logo2} alt="" />
            </Link>
            <Link
              className={styles.header_login}
              to={localStorage.getItem("token") ? "/profile" : "#"}
              onClick={() => setInvestorModal("loginBySMS")}
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
          to={localStorage.getItem("token") ? "/profile" : "#"}
          onClick={() => setInvestorModal("loginBySMS")}
        >
          <img src={logo1} alt="" />
        </Link>{" "}
        <Link className={styles.header_login} to={"tel:88006005156"}>
          <img src={logo2} alt="" />
        </Link>
        <Link
          className={styles.header_login}
          to={localStorage.getItem("token") ? "/profile" : "#"}
          onClick={() => setInvestorModal("loginBySMS")}
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

      {/*
      
      
      
      
        Modals
      
      
      
      
      
      
      */}
      {investorModal == "register" && (
        <div className={styles.investor}>
          <div className={styles.investor_body}>
            <h1 className={styles.investor_title}>Регистрация</h1>
            <button
              className={styles.investor_closeButton}
              onClick={() => setInvestorModal(false)}
            >
              <IoMdClose style={{ width: "100%", height: "100%" }} />
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setWaiting(true);
                axios(
                  `${import.meta.env.VITE_APP_API_URL}/auth/request-register`,
                  {
                    method: "POST",
                    data: {
                      last_name: surname,
                      first_name: name,
                      patronymic,
                      email,
                      phone,
                    },
                  }
                )
                  .then(() => {
                    setInvestorModal("confirmRegister");
                  })
                  .catch((err) => console.log(err))
                  .finally(() => {
                    setWaiting(false);
                  });
                // setInvestorModal(false);
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
              <p
                className={styles.investor_link}
                onClick={() => setInvestorModal("loginBySMS")}
              >
                ВОЙТИ
              </p>
              <label className={styles.investor_form_confirm}>
                <p>
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
      {investorModal == "confirmRegister" && (
        <div className={styles.investor}>
          <div className={styles.investor_body}>
            <h1 className={styles.investor_title}>Регистрация</h1>
            <button
              className={styles.investor_closeButton}
              onClick={() => setInvestorModal(false)}
            >
              <IoMdClose style={{ width: "100%", height: "100%" }} />
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setWaiting(true);
                axios(
                  `${import.meta.env.VITE_APP_API_URL}/auth/confirm-register`,
                  {
                    method: "POST",
                    data: { phone, code },
                  }
                )
                  .then(() => {
                    setInvestorModal(false);
                    localStorage.setItem("token", "investor");
                    navigate("/profile");
                  })
                  .catch((err) => console.log(err))
                  .finally(() => {
                    setWaiting(false);
                  });
              }}
              className={styles.investor_form}
            >
              <label className={styles.investor_form_label}>
                <p>Введите код из СМС:</p>
                <PatternFormat
                  format="### ###"
                  mask=" "
                  allowEmptyFormatting
                  className={styles.investor_form_code}
                  type="tel"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <span>
                  Код отправлен на номер{" "}
                  <PatternFormat
                    displayType="text"
                    format="+7 (###) ### ## ##"
                    value={phone}
                  />
                </span>
              </label>
              <button type="submit">Подтвердить</button>
              <button
                onClick={() => {
                  setWaiting(true);
                  axios(
                    `${import.meta.env.VITE_APP_API_URL}/auth/request-register`,
                    {
                      method: "POST",
                      data: { phone },
                    }
                  )
                    .then(() => {
                      setInvestorModal("confirmRegister");
                    })
                    .catch((err) => console.log(err))
                    .finally(() => {
                      setWaiting(false);
                    });
                }}
                className={styles.investor_getAgain}
              >
                Отправить код еще раз
              </button>
              <p className={styles.investor_changePhone}>
                Не приходит код? Проверьте правильность номера телефона.
                <span onClick={() => setInvestorModal("register")}>
                  Изменить номер
                </span>
              </p>
            </form>
          </div>
        </div>
      )}

      {investorModal == "loginByCreds" && (
        <div className={styles.investor}>
          <div className={styles.investor_body}>
            <h1 className={styles.investor_title}>Вход в личный кабинет</h1>
            <div className={styles.investor_selecttLoginType}>
              <div onClick={() => setInvestorModal("loginBySMS")}>СМС-код</div>
              <div className={styles.investor_selecttLoginType_active}>
                Логин и пароль
              </div>
            </div>
            <button
              className={styles.investor_closeButton}
              onClick={() => setInvestorModal(false)}
            >
              <IoMdClose style={{ width: "100%", height: "100%" }} />
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setWaiting(true);
                axios(
                  `${import.meta.env.VITE_APP_API_URL}/auth/login-by-creds`,
                  {
                    method: "POST",
                    data: { login, password },
                  }
                )
                  .then(() => {
                    setInvestorModal(false);
                    localStorage.setItem("token", "investor");
                    navigate("/profile");
                  })
                  .catch((err) => console.log(err))
                  .finally(() => {
                    setWaiting(false);
                  });
              }}
              className={styles.investor_form}
            >
              <label className={styles.investor_form_label}>
                <p>Телефон или email:</p>
                <input
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </label>
              <label className={styles.investor_form_label}>
                <p>Пароль:</p>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.investor_form_showPassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </label>
              <button disabled={!login || !password} type="submit">
                Войти
              </button>
              <p
                className={styles.investor_link}
                onClick={() => setInvestorModal("register")}
              >
                ЗАРЕГИСТРИРОВАТЬСЯ
              </p>
            </form>
          </div>
        </div>
      )}
      {investorModal == "loginBySMS" && (
        <div className={styles.investor}>
          <div className={styles.investor_body}>
            <h1 className={styles.investor_title}>Вход в личный кабинет</h1>
            <div className={styles.investor_selecttLoginType}>
              <div className={styles.investor_selecttLoginType_active}>
                СМС-код
              </div>
              <div onClick={() => setInvestorModal("loginByCreds")}>
                Логин и пароль
              </div>
            </div>
            <button
              className={styles.investor_closeButton}
              onClick={() => setInvestorModal(false)}
            >
              <IoMdClose style={{ width: "100%", height: "100%" }} />
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setWaiting(true);
                axios(
                  `${import.meta.env.VITE_APP_API_URL}/auth/request-login`,
                  {
                    method: "POST",
                    data: { phone },
                  }
                )
                  .then(() => {
                    setInvestorModal("confirmLogin");
                  })
                  .catch((err) => console.log(err))
                  .finally(() => {
                    setWaiting(false);
                  });
              }}
              className={styles.investor_form}
            >
              <label className={styles.investor_form_label}>
                <p>Телефон:</p>
                <PatternFormat
                  format="+7 ### ### ## ##"
                  mask=" "
                  allowEmptyFormatting
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <span
                  style={{
                    textAlign: "center",
                    width: "300px",
                  }}
                >
                  Введите номер мобильного телефона, который Вы указали при
                  регистрации
                </span>
              </label>
              <button
                disabled={phone.trim().split(" ").join("").length != 12}
                type="submit"
              >
                Войти
              </button>
              <p
                className={styles.investor_link}
                onClick={() => setInvestorModal("register")}
              >
                ЗАРЕГИСТРИРОВАТСЯ
              </p>
            </form>
          </div>
        </div>
      )}
      {investorModal == "confirmLogin" && (
        <div className={styles.investor}>
          <div className={styles.investor_body}>
            <h1 className={styles.investor_title}>Вход в личный кабинет</h1>
            <div className={styles.investor_selecttLoginType}>
              <div className={styles.investor_selecttLoginType_active}>
                СМС-код
              </div>
              <div onClick={() => setInvestorModal("loginByCreds")}>
                Логин и пароль
              </div>
            </div>
            <button
              className={styles.investor_closeButton}
              onClick={() => setInvestorModal(false)}
            >
              <IoMdClose style={{ width: "100%", height: "100%" }} />
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setWaiting(true);
                axios(
                  `${import.meta.env.VITE_APP_API_URL}/auth/confirm-login`,
                  {
                    method: "POST",
                    data: { phone, code },
                  }
                )
                  .then(() => {
                    setInvestorModal(false);
                    localStorage.setItem("token", "investor");
                    navigate("/profile");
                  })
                  .catch((err) => console.log(err))
                  .finally(() => {
                    setWaiting(false);
                  });
              }}
              className={styles.investor_form}
            >
              <label className={styles.investor_form_label}>
                <p>Введите код из СМС:</p>
                <PatternFormat
                  format="### ###"
                  mask=" "
                  allowEmptyFormatting
                  className={styles.investor_form_code}
                  type="tel"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <span>
                  Код отправлен на номер{" "}
                  <PatternFormat
                    displayType="text"
                    format="+7 (###) ### ## ##"
                    value={phone}
                  />
                </span>
              </label>
              <button type="submit">Подтвердить</button>
              <button
                onClick={() => {
                  setWaiting(true);
                  axios(
                    `${import.meta.env.VITE_APP_API_URL}/auth/request-login`,
                    {
                      method: "POST",
                      data: { phone },
                    }
                  )
                    .then(() => {
                      setInvestorModal("confirmLogin");
                    })
                    .catch((err) => console.log(err))
                    .finally(() => {
                      setWaiting(false);
                    });
                }}
                className={styles.investor_getAgain}
              >
                Отправить код еще раз
              </button>
              <p className={styles.investor_changePhone}>
                Не приходит код? Проверьте правильность номера телефона.
                <span onClick={() => setInvestorModal("register")}>
                  Изменить номер
                </span>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
