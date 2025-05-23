import { FaChevronDown } from "react-icons/fa";
import styles from "./Partners.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../../../widgets/Loading/Loading";
import { toast } from "react-toastify";

export const Partners = () => {
  const [secondChild, setSecondChild] = useState<number | false>(false);
  const [thirdChild, setThirdChild] = useState<number | false>(false);
  const [fourthChild, setFourthChild] = useState<number | false>(false);
  const [secondChapter, setSecondChatper] = useState<"invests" | "referals">(
    "referals"
  );
  const [thirdChapter, setThirdChatper] = useState<"invests" | "referals">(
    "referals"
  );
  const [id, setId] = useState<any>(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios(`${import.meta.env.VITE_APP_API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => setId(res.data.ID))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return (
    <div className={styles.partners}>
      {loading && <Loading />}
      <div className={styles.partners_top}>
        <h1 className={styles.partners_top_title}>Партнеры</h1>
        <section>
          <p>
            Пригласить партнера:
            <span>https://emelia-invest.com/register?referrerId={id} </span>
          </p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `https://emelia-invest.com/register?referrerId=${id}`
              );
              toast.success("Ссылка скопирована");
            }}
          >
            Копировать
          </button>
        </section>
      </div>
      {data.length ? (
        <div className={styles.partners_table}>
          <div className={styles.partners_table_top}>
            <p>ID</p>
            <p>Мои проценты</p>
            <p>Мой доход</p>
          </div>
          <div className={styles.partners_table_body}>
            {data.map((item: any) => (
              <>
                <div
                  style={{
                    borderBottom:
                      secondChild == item.id ? "none" : "1px solid #5A432E",
                    color: secondChild == item.id ? "#EFB861" : "white",
                  }}
                  key={item.id}
                  className={styles.partners_table_item}
                >
                  <p
                    onClick={() =>
                      setSecondChild(secondChild == item.id ? false : item.id)
                    }
                  >
                    ID {item.id}
                  </p>
                  <p
                    onClick={() =>
                      setSecondChild(secondChild == item.id ? false : item.id)
                    }
                  >
                    {item.percents}%
                  </p>
                  <p
                    onClick={() =>
                      setSecondChild(secondChild == item.id ? false : item.id)
                    }
                  >
                    {item.incoming} ₽
                  </p>
                  <span
                    onClick={() =>
                      setSecondChild(secondChild == item.id ? false : item.id)
                    }
                  >
                    <FaChevronDown
                      style={{
                        transform: `rotate(${
                          secondChild == item.id ? "180deg" : "0deg"
                        })`,
                      }}
                    />
                  </span>
                </div>
                {secondChild == item.id && (
                  <div className={styles.partners_table_second}>
                    <div className={styles.partners_table_second_chapters}>
                      <span
                        style={{
                          color:
                            secondChapter == "referals" ? "white" : "#5A432E",
                        }}
                        onClick={() => setSecondChatper("referals")}
                      >
                        Рефералы 2 уровня
                      </span>{" "}
                      <span
                        style={{
                          color:
                            secondChapter == "invests" ? "white" : "#5A432E",
                        }}
                        onClick={() => setSecondChatper("invests")}
                      >
                        Инвестиции
                      </span>
                    </div>
                    {secondChapter == "referals" ? (
                      item.childs?.map((item: any) => (
                        <>
                          <div
                            style={{
                              borderBottom:
                                thirdChild == item.id
                                  ? "none"
                                  : "1px solid #5A432E",
                              color:
                                thirdChild == item.id ? "#EFB861" : "white",
                            }}
                            key={item.id}
                            className={`${styles.partners_table_item} ${styles.partners_table_item_second}`}
                          >
                            <p
                              onClick={() =>
                                setThirdChild(
                                  thirdChild == item.id ? false : item.id
                                )
                              }
                            >
                              ID {item.id}
                            </p>
                            <p
                              onClick={() =>
                                setThirdChild(
                                  thirdChild == item.id ? false : item.id
                                )
                              }
                            >
                              {item.percents}%
                            </p>
                            <p
                              onClick={() =>
                                setThirdChild(
                                  thirdChild == item.id ? false : item.id
                                )
                              }
                            >
                              {item.incoming} ₽
                            </p>
                            <span
                              onClick={() =>
                                setThirdChild(
                                  thirdChild == item.id ? false : item.id
                                )
                              }
                            >
                              <FaChevronDown
                                style={{
                                  transform: `rotate(${
                                    secondChild == item.id ? "180deg" : "0deg"
                                  })`,
                                }}
                              />
                            </span>
                          </div>
                          {thirdChild == item.id && (
                            <div
                              className={`${styles.partners_table_second} ${styles.partners_table_third}`}
                              style={{ background: "#18120A" }}
                            >
                              <div
                                className={
                                  styles.partners_table_second_chapters
                                }
                                style={{ background: "#2D2218" }}
                              >
                                <span
                                  style={{
                                    color:
                                      thirdChapter == "referals"
                                        ? "white"
                                        : "#5A432E",
                                    background: "#2d2218",
                                  }}
                                  onClick={() => setThirdChatper("referals")}
                                >
                                  Рефералы 3 уровня
                                </span>{" "}
                                <span
                                  style={{
                                    color:
                                      thirdChapter == "invests"
                                        ? "white"
                                        : "#5A432E",
                                    background: "#2d2218",
                                  }}
                                  onClick={() => setThirdChatper("invests")}
                                >
                                  Инвестиции
                                </span>
                              </div>
                              {thirdChapter == "referals" ? (
                                item.childs?.map((item: any) => (
                                  <>
                                    <div
                                      style={{
                                        borderBottom:
                                          fourthChild == item.id
                                            ? "none"
                                            : "1px solid #5A432E",
                                        color:
                                          fourthChild == item.id
                                            ? "#EFB861"
                                            : "white",
                                        background:
                                          fourthChild == item.id
                                            ? "#241B0F"
                                            : "",
                                      }}
                                      key={item.id}
                                      className={`${styles.partners_table_item} ${styles.partners_table_item_second}`}
                                    >
                                      <p
                                        onClick={() =>
                                          setFourthChild(
                                            fourthChild == item.id
                                              ? false
                                              : item.id
                                          )
                                        }
                                      >
                                        ID {item.id}
                                      </p>
                                      <p
                                        onClick={() =>
                                          setFourthChild(
                                            fourthChild == item.id
                                              ? false
                                              : item.id
                                          )
                                        }
                                      >
                                        {item.percents}%
                                      </p>
                                      <p
                                        onClick={() =>
                                          setFourthChild(
                                            fourthChild == item.id
                                              ? false
                                              : item.id
                                          )
                                        }
                                      >
                                        {item.incoming} ₽
                                      </p>
                                      <span
                                        onClick={() =>
                                          setFourthChild(
                                            fourthChild == item.id
                                              ? false
                                              : item.id
                                          )
                                        }
                                      >
                                        <FaChevronDown
                                          style={{
                                            transform: `rotate(${
                                              fourthChild == item.id
                                                ? "180deg"
                                                : "0deg"
                                            })`,
                                          }}
                                        />
                                      </span>
                                    </div>
                                    {fourthChild == item.id && (
                                      <div>
                                        <div
                                          style={{
                                            color: "#775E46",
                                            background: "#241B0F",
                                          }}
                                          className={`${styles.partners_table_item_second} ${styles.partners_table_item}`}
                                        >
                                          <p>Сумма</p>
                                          <p>Мои проценты</p>
                                          <p>Мой доход</p>
                                        </div>
                                        <div
                                          className={styles.partners_table_body}
                                        >
                                          {item.invests?.map(
                                            (item: any, index: any) => (
                                              <div
                                                key={index}
                                                style={{
                                                  background: "#241B0F",
                                                }}
                                                className={`${styles.partners_table_item_second} ${styles.partners_table_item}`}
                                              >
                                                <p>{item.sum} ₽</p>
                                                <p>{item.percents}</p>
                                                <p>{item.incoming}</p>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </>
                                ))
                              ) : (
                                <div>
                                  <div
                                    style={{
                                      color: "#775E46",
                                      background: "#2d2218",
                                    }}
                                    className={`${styles.partners_table_item_second} ${styles.partners_table_item}`}
                                  >
                                    <p>Сумма</p>
                                    <p>Мои проценты</p>
                                    <p>Мой доход</p>
                                  </div>
                                  <div className={styles.partners_table_body}>
                                    {item.invests?.map(
                                      (item: any, index: any) => (
                                        <div
                                          key={index}
                                          style={{
                                            background: "#2d2218",
                                          }}
                                          className={`${styles.partners_table_item_second} ${styles.partners_table_item}`}
                                        >
                                          <p>{item.sum} ₽</p>
                                          <p>{item.percents}</p>
                                          <p>{item.incoming}</p>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      ))
                    ) : (
                      <div>
                        <div
                          style={{ color: "#775E46" }}
                          className={`${styles.partners_table_item_second} ${styles.partners_table_item}`}
                        >
                          <p>Сумма</p>
                          <p>Мои проценты</p>
                          <p>Мой доход</p>
                        </div>
                        <div className={styles.partners_table_body}>
                          {item.invests?.map((item: any, index: any) => (
                            <div
                              key={index}
                              className={`${styles.partners_table_item_second} ${styles.partners_table_item}`}
                            >
                              <p>{item.sum} ₽</p>
                              <p>{item.percents}</p>
                              <p>{item.incoming}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p>Нет данных</p>
        </div>
      )}
    </div>
  );
};

const data:
  | {
      id: number;
      percents: number;
      incoming: number;
      childs?: {
        id: number;
        percents: number;
        incoming: number;
        childs?: any[];
        invests?: { sum: number; percents: number; incoming: number }[];
      }[];
      invests?: { sum: number; percents: number; incoming: number }[];
    }
  | any = [
  // {
  //   id: 45643646,
  //   percents: 3,
  //   incoming: 1000,
  //   childs: [
  //     {
  //       id: 45643649,
  //       percents: 1,
  //       incoming: 1000,
  //       childs: [
  //         {
  //           id: 45643649,
  //           percents: 1,
  //           incoming: 1000,
  //           invests: [
  //             { sum: 9000, percents: 3, incoming: 1000 },
  //             { sum: 9000, percents: 3, incoming: 1000 },
  //             { sum: 9000, percents: 3, incoming: 1000 },
  //           ],
  //         },
  //         {
  //           id: 45643650,
  //           percents: 1,
  //           incoming: 1000,
  //         },
  //         {
  //           id: 45643651,
  //           percents: 1,
  //           incoming: 1000,
  //         },
  //       ],
  //       invests: [
  //         { sum: 9000, percents: 3, incoming: 1000 },
  //         { sum: 9000, percents: 3, incoming: 1000 },
  //         { sum: 9000, percents: 3, incoming: 1000 },
  //       ],
  //     },
  //     {
  //       id: 45643650,
  //       percents: 1,
  //       incoming: 1000,
  //     },
  //     {
  //       id: 45643651,
  //       percents: 1,
  //       incoming: 1000,
  //     },
  //   ],
  //   invests: [
  //     { sum: 9000, percents: 3, incoming: 1000 },
  //     { sum: 9000, percents: 3, incoming: 1000 },
  //     { sum: 9000, percents: 3, incoming: 1000 },
  //   ],
  // },
  // {
  //   id: 45643647,
  //   percents: 3,
  //   incoming: 1000,
  // },
  // {
  //   id: 45643648,
  //   percents: 3,
  //   incoming: 1000,
  // },
];
