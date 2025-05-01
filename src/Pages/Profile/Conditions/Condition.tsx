import styles from "./Condition.module.scss";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import adv1 from "../../../assets/Vector-adv_1.svg";
import adv2 from "../../../assets/Vector-adv_2.svg";
import adv3 from "../../../assets/Vector-adv_3.svg";

export const Condition = () => {
  return (
    <div className={styles.condition}>
      <h1 className={styles.condition_title}>Условия инвестирования</h1>
      <p className={styles.condition_subtitle}>
        <i>Уважаемый инвестор, мы рады приветствовать Вас на нашем сайте!</i>
        <br />
        <br />С нами Вы сможете как получать доходность от вложения собственных
        средств, так и привлекать рефералов за вознаграждение. Это максимально
        просто. <br />
        <br /> Выбирайте подходящий тариф:
      </p>
      <div>
        <Swiper
          modules={[Pagination]}
          spaceBetween={5}
          slidesPerView={1}
          breakpoints={{
            1920: { slidesPerView: 3 },
            1440: { slidesPerView: 3 },
            1190: { slidesPerView: 2 },
            1024: { slidesPerView: 1 },
            769: { slidesPerView: 2 },
            768: { slidesPerView: 1 },
            0: { slidesPerView: "auto" },
          }}
          pagination={{ clickable: true }}
          className={styles.slider}
        >
          {advantages.map((item) => (
            <SwiperSlide>
              <div key={item.id} className={styles.condition_advantages_item}>
                <img src={item.img} alt={item.title} />
                <h1>{item.title}</h1>
                <p>{item.price}</p>
                <section className={styles.condition_advantages_item_section}>
                  <p>Доходность</p>
                  <span>{item.amount}</span>
                </section>
                <div className={styles.condition_advantages_item_info}>
                  <p>
                    Процент дохода на уровне при первом вложении - однократный /
                    ежедневный процент от прибыли реферала:
                  </p>
                  <div>
                    <section>
                      <span>1 уровень</span>
                      <p>{item.lvl1}</p>
                    </section>
                    <section>
                      <span>2 уровень</span>
                      <p>{item.lvl2}</p>
                    </section>
                    <section>
                      <span>3 уровень</span>
                      <p>{item.lvl3}</p>
                    </section>
                  </div>
                </div>
                <button>Инвестировать</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <p className={styles.condition_subtitle}>
        - Все вклады замораживаются сроком на 300 дней. По прошествии этого
        периода времени Вы сможете вывести свои деньги. <br />
        <br /> - Все вклады являются пополняемыми. Вы можете увеличивать сумму
        своих инвестиций, автоматически переходя на более выгодный тариф. <br />
        <br /> - Процент, полученный по вкладу, либо от приведённого Вами
        реферала любого уровня, а также менеджерский процент, являются Вашим
        активом, начисляются ежедневно, и могут быть выведены в любой момент.{" "}
        <br />
        <br /> - Зачисление процента на указанный Вами счёт произойдёт в течение
        24 часов после получения заявки на вывод. <br />
        <br />
        <br /> <i>Как это работает:</i> <br />
        <br /> Предположим, Вы имеете сумму для инвестиций в размере 10 000
        рублей. Выша сумма подходит для вложений по тарифу «Лёгкий старт».
        Вложив свои финансовые средства по данному тарифу, вы можете приступить
        к привлечению рефералов. Приведя реферала 1-го уровня, Вы получите
        единоразовую выплату в размере 3 % от вложения Вашего реферала, а также
        ежедневные начисления - 3% от дохода Вашего реферала. Если Ваш реферал
        также приводит реферала, то Ваша прибыль станет ещё больше. Вы также
        получите однократно 1% от суммы, вложенной рефералом 2-го уровня, и
        ежедневно 1% от прибыли реферала 2-го уровня. И так далее... <br />
        <br /> В случае, если Ваши инвестиции составляют 1 млн. рублей, и более,
        Вы станете инвестором тарифа «МАКСИМУМ», что позволит Вам стать
        менеджером, и получать ещё больше прибыли. Условия для получения
        менеджерских бонусов просты: <br />
        <br /> - Вы сами инвестировали сумму не менее 1 000 000 рублей, и
        привлекли рефералов с вложениями на ту же сумму. Количество рефералов
        значения не имеет, это может быть как один партнёр, инвестировавший
        сразу 1 000 000 рублей, так и множество людей, инвестировавших на общую
        сумму 1 000 000 рублей. <br />
        <br />В таком случае вы, как менеджер, получите 2 % однократно от суммы,
        вложенной, привлеченными рефералами первого уровня. <br />
        <br /> К примеру: если Ваши рефералы первого уровня инвестировали на
        минимально возможную по условиям сумму 1 000 000 рублей, Вы
        автоматически получаете менеджерский бонус в размере 20 000 рублей.
      </p>
    </div>
  );
};

interface Advantage {
  id: number;
  img: string;
  title: string;
  amount: string;
  price: string;
  lvl1: string;
  lvl2: string;
  lvl3: string;
}

const advantages: Advantage[] = [
  {
    id: 1,
    img: adv1,
    title: "Легкий старт",
    amount: "0,8% / день",
    price: "Вложение  1 000 - 499 999 ₽",
    lvl1: "3/3",
    lvl2: "1/1",
    lvl3: "0,5/0,5",
  },
  {
    id: 2,
    img: adv2,
    title: "Триумф",
    amount: "0,9% / день",
    price: "Вложение  500 000 - 999 999 ₽",
    lvl1: "3,5/3,5",
    lvl2: "1/1",
    lvl3: "0,5/0,5",
  },
  {
    id: 3,
    img: adv3,
    title: "Максимум",
    amount: "1,0% / день",
    price: "Вложение  1 000 000 - 2 500 000 ₽",
    lvl1: "4/4",
    lvl2: "1/1",
    lvl3: "0,5/0,5",
  },
];
