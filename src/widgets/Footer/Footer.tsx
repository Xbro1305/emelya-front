import styles from "./Footer.module.scss";
import logo1 from "../../assets/Subtract-footer_1.svg";
import logo2 from "../../assets/Subtract-footer_2.svg";
import logo3 from "../../assets/Subtract-footer_3.svg";
import logo4 from "../../assets/Subtract-footer_4.svg";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <span>
          <Link to="https://www.cbr.ru/finorg/foinfo/?ogrn=1247700635478">
            © ООО МКК "Гранат", <br /> ИНН 7733455259, ОГРН 1247700635478
          </Link>
        </span>
        <span>125424, город Москва, Волоколамское ш, д. 108, помещ. 8ц</span>
      </div>
      <div>
        <a href="tel:88006005156" style={{ marginBottom: "10px" }}>
          8 800 600 51 56
        </a>
        <section>
          <span>Мы в соцсетях:</span>
          <Link to="https://t.me/emelyazaym">
            <img src={logo1} alt="" />
          </Link>
          <Link to="https://vk.com/emelyazaym">
            <img src={logo2} alt="" />
          </Link>
          <Link to="https://ok.ru/group/70000034587968">
            <img src={logo3} alt="" />
          </Link>
          <Link to="/">
            <img src={logo4} alt="" />
          </Link>
        </section>
      </div>
    </footer>
  );
};
