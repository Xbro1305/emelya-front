import styles from "./Home.module.scss";
import coins from "../../assets/intro_coins.svg";
import intro1 from "../../assets/Vector-intro_1.svg";
import intro2 from "../../assets/Vector-intro_2.svg";
import intro3 from "../../assets/Vector-intro_3.svg";
import intro4 from "../../assets/Vector-intro_4.svg";
import stage1 from "../../assets/Group 7-stages_1.svg";
import stage2 from "../../assets/Group 8-stages_2.svg";
import stage3 from "../../assets/Group 10-stages_3.svg";
import arrowtop from "../../assets/Group 17arrow-to-top.svg";
import arrowbottom from "../../assets/Group 16arrow-to-bottom.svg";
import adv1 from "../../assets/Vector-adv_1.svg";
import adv2 from "../../assets/Vector-adv_2.svg";
import adv3 from "../../assets/Vector-adv_3.svg";
import hand from "../../assets/Vector-hand.svg";
import need1 from "../../assets/Vector-need_1.svg";
import need2 from "../../assets/Vector-need_2.svg";
import need3 from "../../assets/Vector-need_3.svg";
import need4 from "../../assets/Vector-need_4.svg";
import investBg from "../../assets/invest-bg.svg";
import certificate from "../../assets/certificate.png";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { BiMinus, BiPlus } from "react-icons/bi";
import { PATHS } from "../../App";
import { toast } from "react-toastify";

interface Advantage {
  id: number;
  img: string;
  title: string;
  description: string;
  amount: string;
  term: string;
}

const advantages: Advantage[] = [
  {
    id: 1,
    img: adv1,
    title: "Стартовый",
    description: "Первый займ без % для новых клиентов",
    amount: "до 20 000 ₽",
    term: "до 35 дней",
  },
  {
    id: 2,
    img: adv2,
    title: "Удачный",
    description: "Доступен для тех, кто уже стал нашим клиентом ранее",
    amount: "до 50 000 ₽",
    term: "до 14 недель",
  },
  {
    id: 3,
    img: adv3,
    title: "Люкс",
    description: "Для постоянных клиентов",
    amount: "до 100 000 ₽",
    term: "до 20 недель",
  },
];

export const Home = () => {
  const [sum, setSum] = useState(1000);
  const [term, setTerm] = useState(5);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [open, setOpen] = useState(0);
  const navigate = useNavigate();

  const getTermLabel = (term: number): string => {
    const lastDigit = term % 10;
    const lastTwoDigits = term % 100;

    if (term % 30 === 0) {
      const months = term / 30;
      const monthLastDigit = months % 10;
      const monthLastTwoDigits = months % 100;

      if (monthLastDigit === 1 && monthLastTwoDigits !== 11) {
        return `${months} месяц`;
      } else if (
        [2, 3, 4].includes(monthLastDigit) &&
        ![12, 13, 14].includes(monthLastTwoDigits)
      ) {
        return `${months} месяца`;
      } else {
        return `${months} месяцев`;
      }
    }

    if (term % 7 === 0) {
      const weeks = term / 7;
      const weekLastDigit = weeks % 10;
      const weekLastTwoDigits = weeks % 100;

      if (weekLastDigit === 1 && weekLastTwoDigits !== 11) {
        return `${weeks} неделя`;
      } else if (
        [2, 3, 4].includes(weekLastDigit) &&
        ![12, 13, 14].includes(weekLastTwoDigits)
      ) {
        return `${weeks} недели`;
      } else {
        return `${weeks} недель`;
      }
    }

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return `${term} день`;
    } else if (
      [2, 3, 4].includes(lastDigit) &&
      ![12, 13, 14].includes(lastTwoDigits)
    ) {
      return `${term} дня`;
    } else {
      return `${term} дней`;
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.home_intro}>
        <div className={styles.home_intro_left}>
          <h1>Получи свой первый займ прямо сейчас!</h1>
          <p>
            Для новых клиентов первый займ без %, с возможностью продления срока
            займа в дальнейшем
          </p>
          <div className={styles.home_intro_left_adv}>
            <div className={styles.home_intro_left_adv_item}>
              <img src={intro1} alt="" />
              <p>Обрабатываем заявки 24/7</p>
            </div>
            <div className={styles.home_intro_left_adv_item}>
              <img src={intro2} alt="" />
              <p>Принимаем решение в течение 5 минут</p>
            </div>
            <div className={styles.home_intro_left_adv_item}>
              <img src={intro3} alt="" />
              <p>Одобряем 99,9% заявок</p>
            </div>
            <div className={styles.home_intro_left_adv_item}>
              <img src={intro4} alt="" />
              <p>Деньги зачисляются на карту мгновенно</p>
            </div>
          </div>
        </div>
        <div className={styles.home_intro_right}>
          <img src={coins} className={styles.home_intro_right_bg} alt="" />
          <div className={styles.home_intro_right_content}>
            <div className={styles.home_intro_right_range}>
              <section>
                <p>Выберите сумму</p>{" "}
                <span>
                  <NumericFormat
                    displayType="text"
                    value={sum}
                    thousandSeparator=" "
                  />{" "}
                  ₽
                </span>
              </section>
              <div
                style={{ position: "relative" }}
                className={styles.home_intro_right_range_input}
              >
                <input
                  type="range"
                  min={1000}
                  max={100000}
                  step={1000}
                  value={sum}
                  onChange={(e) => setSum(Number(e.target.value))}
                />
              </div>
              <div>
                <p onClick={() => setSum(1500)}>1 500 ₽</p>
                <p onClick={() => setSum(50000)}>50 000 ₽</p>
                <p onClick={() => setSum(100000)}>100 000 ₽</p>
              </div>
            </div>
            <div className={styles.home_intro_right_range}>
              <section>
                <p>Выберите срок</p> <span>{getTermLabel(term)}</span>
              </section>
              <div
                style={{ position: "relative" }}
                className={styles.home_intro_right_range_input}
              >
                <input
                  type="range"
                  min={5}
                  max={126}
                  step={1}
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                />
              </div>
              <div>
                <p onClick={() => setTerm(5)}>5 дней </p>
                <p onClick={() => setTerm(63)}>9 недель</p>
                <p onClick={() => setTerm(126)}>18 недель</p>
              </div>
            </div>
            <button className={styles.home_intro_right_getButton}>
              Получить деньги
            </button>
            <div className={styles.home_intro_right_info}>
              <section>
                <p>Вы берете</p> <span></span>
                <NumericFormat
                  displayType="text"
                  value={sum}
                  thousandSeparator=" "
                  suffix="₽"
                />
              </section>
              <section>
                <p>Вы возвращаете</p> <span></span>
                <NumericFormat
                  displayType="text"
                  value={sum + sum * 0.2}
                  thousandSeparator=" "
                  suffix="₽"
                />
              </section>
              <section>
                <p>До (включительно)</p> <span></span>
                {new Date(
                  Date.now() + term * 24 * 60 * 60 * 1000
                ).toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
              </section>
            </div>
            <section className={styles.home_intro_right_promo_section}>
              <Link to="/" onClick={() => setIsPromoOpen(!isPromoOpen)}>
                Промокод
              </Link>

              {isPromoOpen && (
                <>
                  <input placeholder="Введите промокод" type="text" />{" "}
                  <button>Применить</button>
                </>
              )}
            </section>
            <Link to="">
              А что если я не успеваю вернуть вовремя?
              <p>
                В случае непредвиденных ситуаций Емеля готов <br /> продлить
                срок возврата денег <i>до 60-ти дней!</i>
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.home_stages}>
        <h1 className={styles.home_stages_h1}>Как получить займ?</h1>
        <div className={styles.home_stages_list}>
          <div>
            <img src={stage1} alt="" />
            <p>Заполните заявку, предоставив персональные данные</p>
          </div>
          <img src={arrowtop} alt="" />
          <div>
            <img src={stage2} alt="" />
            <p>Ожидайте решения по заявке</p>
          </div>
          <img src={arrowbottom} style={{ marginBottom: "auto" }} alt="" />
          <div>
            <img src={stage3} alt="" />
            <p style={{ width: "231px" }}>
              Когда заявка одобрена, подпишите договор займа, и получите деньги
              на любую банковскую карту.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.home_whyUs}>
        <h1 className={styles.home_stages_h1}>Почему мы?</h1>
        <div className={styles.home_whyUs_list}>
          <div>
            <div>
              <img src={hand} alt="" />
              <p>
                Мы предоставляем займы <i>без скрытых комиссий и платежей.</i>
              </p>
            </div>
            <div>
              <img src={hand} alt="" />
              <p>
                Нам не важна Ваша кредитная история.{" "}
                <i>Одобряем 99,9% заявок</i> на займ.
              </p>
            </div>
            <div>
              <img src={hand} alt="" />
              <p>
                Выдаем займы <i>до 100 000 рублей.</i>
              </p>
            </div>
            <div>
              <img src={hand} alt="" />
              <p>
                <i>Возможность пролонгирования</i> срока займа, в случае
                отсутствия возможности погасить задолженность в срок.
              </p>
            </div>
          </div>
          <div>
            <div>
              <img src={hand} alt="" />
              <p>
                Предоставляем <i>удобные способы погашения</i> займа.
              </p>
            </div>
            <div>
              <img src={hand} alt="" />
              <p>
                Мы всегда на связи! <i>Круглосуточная поддержка</i> без выходных
                и праздников.
              </p>
            </div>
            <div>
              <img src={hand} alt="" />
              <p>
                Получая займ в «Емеля» у Вас есть{" "}
                <i>возможность улучшить свой кредитный рейтинг.</i> Передаём всю
                информацию о заёмщиках в Бюро кредитных историй.
              </p>
            </div>
            <div>
              <img src={hand} alt="" />
              <p>
                У наших клиентов всегда есть{" "}
                <i>возможность погасить займ досрочно </i>
                частично, либо полностью.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.home_advantages}>
        <h1 className={styles.home_stages_h1}>Виды займов и их особенности</h1>
      </div>
      <div style={{ padding: "0 var(--sides-padding)", background: "#000" }}>
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            1280: { slidesPerView: 3 }, // Ekranga mos ravishda joylashadi
            960: { slidesPerView: 2 },
            768: { slidesPerView: 1 },
            0: { slidesPerView: "auto" },
          }}
          pagination={{ clickable: true }}
          className={styles.slider}
        >
          {advantages.map((item) => (
            <SwiperSlide>
              <div key={item.id} className={styles.home_advantages_item}>
                <img src={item.img} alt={item.title} />
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <section>
                  <p>Сумма займа</p>
                  <span>{item.amount}</span>
                </section>
                <section>
                  <p>Срок</p>
                  <span>{item.term}</span>
                </section>
                <span>С возможностью пролонгации срока займа</span>
                <button>Получить деньги</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.home_needFor}>
        <h1 className={styles.home_stages_h1}>
          Что понадобится для получения займа?
        </h1>
        <div className={styles.home_needFor_list}>
          <div>
            <img src={need1} alt="" />
            <p>Паспорт</p>
          </div>
          <span>+</span>
          <div>
            <img src={need2} alt="" />
            <p>Карта любого банка</p>
          </div>
          <span>+</span>
          <div>
            <img src={need3} alt="" />
            <p>Мобильный номер</p>
          </div>
          <span>+</span>
          <div>
            <img src={need4} alt="" />
            <p>Возраст от 18 до 70 лет</p>
          </div>
        </div>
      </div>
      <div className={styles.home_about}>
        <h1 className={styles.home_stages_h1}>О нас</h1>
        <p>
          Давайте знакомиться! Мы рады приветствовать Вас на сайте
          emelia-invest.com. Хотите узнать о нас больше? Нажимайте на кнопку
        </p>
        <Link to="/">Подробно о нас</Link>
      </div>
      <div className={styles.home_invest}>
        <p></p>
        <p></p>
        <img src={investBg} alt="" />
        <div className={styles.home_invest_content}>
          <h1 className={styles.home_stages_h1}>Для инвестора</h1>
          <p>Хотите инвестировать в emelia-invest?</p>
          <span>
            Тогда пройдите регистрацию, и узнайте обо всех преимуществах
            инвестиций с нами!
          </span>
          <button onClick={() => navigate(PATHS.PROFILE)}>Инвестировать</button>
        </div>
      </div>
      <div className={styles.home_certificates}>
        <h1 className={styles.home_stages_h1}>Документы и свидетельства</h1>
        <div className={styles.home_certificates_list}>
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              1280: { slidesPerView: 5 },
              960: { slidesPerView: 4 },
              // 960: { slidesPerView: 4 },
              768: { slidesPerView: 3 },
              0: { slidesPerView: 2 },
            }}
            pagination={{ clickable: true }}
            className={styles.slider}
          >
            <SwiperSlide>
              <img src={certificate} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={certificate} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={certificate} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={certificate} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={certificate} alt="" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className={styles.home_faq}>
        <h1 className={styles.home_stages_h1}>Частые вопросы </h1>
        <div className={styles.home_faq_list}>
          <div style={open == 1 ? { borderColor: "#efb861" } : {}}>
            <label>
              <p>Это правда, что Вы выдаете первый займ без %?</p>{" "}
              <button onClick={() => setOpen(open == 1 ? 0 : 1)}>
                {open == 1 ? <BiMinus /> : <BiPlus />}
              </button>
            </label>
            {open == 1 && (
              <span>
                ДА!  Действительно, для новых клиентов мы предоставляем такую
                возможность, получить займ до 20 000 рублей, и при условии, что
                Вы погасите его в срок, процент по займу не будет начислен.
              </span>
            )}
          </div>
          <div style={open == 2 ? { borderColor: "#efb861" } : {}}>
            <label>
              <p>Как быстро я получу деньги?</p>
              <button onClick={() => setOpen(open == 2 ? 0 : 2)}>
                {open == 2 ? <BiMinus /> : <BiPlus />}
              </button>
            </label>
            {open == 2 && (
              <span>
                Как правило, деньги поступают Вам на карту в течение минуты
                после подписания Вами договора займа.
              </span>
            )}
          </div>
          <div style={open == 3 ? { borderColor: "#efb861" } : {}}>
            <label>
              <p>Каковы условия получения займа?</p>
              <button onClick={() => setOpen(open == 3 ? 0 : 3)}>
                {open == 3 ? <BiMinus /> : <BiPlus />}
              </button>
            </label>
            {open == 3 && (
              <span>
                Для получения займа Вам необходимо быть гражданином Российской
                Федерации, иметь паспорт, карту любого банка и мобильный номер.
                Возраст от 18 до 70 лет.
              </span>
            )}
          </div>
          <div style={open == 4 ? { borderColor: "#efb861" } : {}}>
            <label>
              <p>
                Могу ли я получить займ, если у меня ранее были просрочки
                пооплате обязательств?
              </p>
              <button onClick={() => setOpen(open == 4 ? 0 : 4)}>
                {open == 4 ? <BiMinus /> : <BiPlus />}
              </button>
            </label>
            {open == 4 && (
              <span>
                Да, мы не учитываем кредитную историю клиента, и принимаем
                решение по займу на основании предоставленных Вами данных.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
