import axios from "axios";
import styles from "./Login.module.scss";

export const Login = () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const value = Object.fromEntries(data.entries());

    console.log("Login data:", value);

    axios(`${baseUrl}/api/auth/login-by-creds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        login: value.login,
        password: value.password,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials.");
      });
  };
  return (
    <div className={styles.login}>
      <div className={styles.login_body}>
        <section className={styles.login_header}>
          <h1 className={styles.login_header_title}>Вход в админ-панель</h1>
        </section>
        <form onSubmit={handleLogin} className={styles.login_form}>
          <input
            type="text"
            placeholder="Логин"
            className={styles.login_input}
            required
            name="login"
          />
          <input
            type="password"
            placeholder="Пароль"
            className={styles.login_input}
            required
            name="password"
          />
          <button type="submit" className={styles.login_button}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
