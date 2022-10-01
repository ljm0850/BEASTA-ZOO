import styles from "./Draw.module.scss";
import _, { map } from "lodash";

import ears1 from "../image/silhouette/ears/1.svg";
import ears2 from "../image/silhouette/ears/2.svg";
import ears3 from "../image/silhouette/ears/3.svg";
import ears4 from "../image/silhouette/ears/4.svg";
import ears5 from "../image/silhouette/ears/5.svg";
import ears6 from "../image/silhouette/ears/6.svg";
import ears7 from "../image/silhouette/ears/7.svg";
import ears8 from "../image/silhouette/ears/8.svg";
import ears9 from "../image/silhouette/ears/9.svg";

import head1 from "../image/silhouette/head/1.svg";
import head2 from "../image/silhouette/head/2.svg";
import head3 from "../image/silhouette/head/3.svg";
import head4 from "../image/silhouette/head/4.svg";
import head5 from "../image/silhouette/head/5.svg";
import head6 from "../image/silhouette/head/6.svg";
import head7 from "../image/silhouette/head/7.svg";
import head8 from "../image/silhouette/head/8.svg";
import head9 from "../image/silhouette/head/9.svg";

import mouth1 from "../image/silhouette/mouth/1.svg";
import mouth2 from "../image/silhouette/mouth/2.svg";
import mouth3 from "../image/silhouette/mouth/3.svg";
import mouth4 from "../image/silhouette/mouth/4.svg";
import mouth5 from "../image/silhouette/mouth/5.svg";
import mouth6 from "../image/silhouette/mouth/6.svg";
import mouth7 from "../image/silhouette/mouth/7.svg";
import mouth8 from "../image/silhouette/mouth/8.svg";
import mouth9 from "../image/silhouette/mouth/9.svg";
import { useEffect } from "react";

interface Props {
  genes: string;
  handleOpenItem: () => void;
}

const Draw = ({ genes, handleOpenItem }: Props) => {
  const headList = [
    head1,
    head2,
    head3,
    head4,
    head5,
    head6,
    head7,
    head8,
    head9,
  ];
  const earsList = [
    ears1,
    ears2,
    ears3,
    ears4,
    ears5,
    ears6,
    ears7,
    ears8,
    ears9,
  ];
  const mouthList = [
    mouth1,
    mouth2,
    mouth3,
    mouth4,
    mouth5,
    mouth6,
    mouth7,
    mouth8,
    mouth9,
  ];

  useEffect(() => {
    if (genes) {
      rouletteHandler();
    }
  }, [genes]);

  const rouletteHandler = () => {
    document.getElementsByClassName(
      `${styles.digitsDiv}`
    )[0].className = `${styles.digitsDiv}`;
    document.getElementsByClassName(
      `${styles.digitsDiv}`
    )[1].className = `${styles.digitsDiv}`;
    document.getElementsByClassName(
      `${styles.digitsDiv}`
    )[2].className = `${styles.digitsDiv}`;
    // document.getElementsByClassName(`${styles.digitsDiv}`)[3].className = `${styles.digitsDiv}`;

    let spin0 = "spin" + genes.charAt(0);
    let spin1 = "spin" + genes.charAt(1);
    let spin2 = "spin" + genes.charAt(2);
    // let spin3 = "spin" + rand.charAt(3);

    // 룰렛 돌리기
    document.getElementsByClassName(
      `${styles.digitsDiv}`
    )[0].className = `${styles.digitsDiv} ${styles[spin0]}`;
    document.getElementsByClassName(
      `${styles.digitsDiv}`
    )[1].className = `${styles.digitsDiv} ${styles[spin1]}`;
    document.getElementsByClassName(
      `${styles.digitsDiv}`
    )[2].className = `${styles.digitsDiv} ${styles[spin2]}`;

    setTimeout(() => {
      handleOpenItem();
    }, 5000);
  };

  return (
    <div>
      <div className={styles.counter}>
        <div className={styles.digitsContainer}>
          <div className={styles.digitsDiv}>
            <span>-</span>
            {headList.map((head) => {
              return (
                <span key={head}>
                  <img src={head} alt="head" />
                </span>
              );
            })}
          </div>
        </div>
        <div className={styles.digitsContainer}>
          <div className={styles.digitsDiv}>
            <span>-</span>
            {earsList.map((ears) => {
              return (
                <span key={ears}>
                  <img src={ears} alt="ear" />
                </span>
              );
            })}
          </div>
        </div>
        <div className={styles.digitsContainer}>
          <div className={styles.digitsDiv}>
            <span>-</span>
            {mouthList.map((mouth) => {
              return (
                <span key={mouth}>
                  <img src={mouth} alt="ear" />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Draw;
