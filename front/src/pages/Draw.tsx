import styles from "./Draw.module.scss";
import _ from "lodash";

import ears1 from "../image/silhouette/ears/1.svg"
import ears2 from "../image/silhouette/ears/2.svg"
import ears3 from "../image/silhouette/ears/3.svg"
import ears4 from "../image/silhouette/ears/4.svg"
import ears5 from "../image/silhouette/ears/5.svg"
import ears6 from "../image/silhouette/ears/6.svg"
import ears7 from "../image/silhouette/ears/7.svg"
import ears8 from "../image/silhouette/ears/8.svg"
import ears9 from "../image/silhouette/ears/9.svg"

import head1 from "../image/silhouette/head/1.svg"
import head2 from "../image/silhouette/head/2.svg"
import head3 from "../image/silhouette/head/3.svg"
import head4 from "../image/silhouette/head/4.svg"
import head5 from "../image/silhouette/head/5.svg"
import head6 from "../image/silhouette/head/6.svg"
import head7 from "../image/silhouette/head/7.svg"
import head8 from "../image/silhouette/head/8.svg"
import head9 from "../image/silhouette/head/9.svg"

import mouth1 from "../image/silhouette/mouth/1.svg"
import mouth2 from "../image/silhouette/mouth/2.svg"
import mouth3 from "../image/silhouette/mouth/3.svg"
import mouth4 from "../image/silhouette/mouth/4.svg"
import mouth5 from "../image/silhouette/mouth/5.svg"
import mouth6 from "../image/silhouette/mouth/6.svg"
import mouth7 from "../image/silhouette/mouth/7.svg"
import mouth8 from "../image/silhouette/mouth/8.svg"
import mouth9 from "../image/silhouette/mouth/9.svg"

const Draw = () => {
  const rouletteHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    document.getElementsByClassName(`${styles.digitsDiv}`)[0].className = `${styles.digitsDiv}`;
    document.getElementsByClassName(`${styles.digitsDiv}`)[1].className = `${styles.digitsDiv}`;
    document.getElementsByClassName(`${styles.digitsDiv}`)[2].className = `${styles.digitsDiv}`;
    // document.getElementsByClassName(`${styles.digitsDiv}`)[3].className = `${styles.digitsDiv}`;
    
    let spin0 = "spin" + _.random(1, 9);
    let spin1 = "spin" + _.random(1, 9);
    let spin2 = "spin" + _.random(1, 9);
    // let spin3 = "spin" + rand.charAt(3);

    setTimeout(function() {
      document.getElementsByClassName(`${styles.digitsDiv}`)[0].className =
        `${styles.digitsDiv} ${styles[spin0]}`;
      document.getElementsByClassName(`${styles.digitsDiv}`)[1].className =
        `${styles.digitsDiv} ${styles[spin1]}`;
      document.getElementsByClassName(`${styles.digitsDiv}`)[2].className =
        `${styles.digitsDiv} ${styles[spin2]}`;
      // document.getElementsByClassName(`${styles.digitsDiv}`)[3].className =
      //   `${styles.digitsDiv} ${styles[spin3]}`;
    }, 0);
  };

  return (
    <div>
      <div className={styles.counter}>
        <div className={styles.digitsContainer}>
          <div className={styles.digitsDiv}>
            <span>-</span>
            <span><img src={ears1} alt="" /></span>
            <span><img src={ears2} alt="" /></span>
            <span><img src={ears3} alt="" /></span>
            <span><img src={ears4} alt="" /></span>
            <span><img src={ears5} alt="" /></span>
            <span><img src={ears6} alt="" /></span>
            <span><img src={ears7} alt="" /></span>
            <span><img src={ears8} alt="" /></span>
            <span><img src={ears9} alt="" /></span>
          </div>
        </div>
        <div className={styles.digitsContainer}>
          <div className={styles.digitsDiv}>
            <span>-</span>
            <span><img src={head1} alt="" /></span>
            <span><img src={head2} alt="" /></span>
            <span><img src={head3} alt="" /></span>
            <span><img src={head4} alt="" /></span>
            <span><img src={head5} alt="" /></span>
            <span><img src={head6} alt="" /></span>
            <span><img src={head7} alt="" /></span>
            <span><img src={head8} alt="" /></span>
            <span><img src={head9} alt="" /></span>
          </div>
        </div>
        <div className={styles.digitsContainer}>
          <div className={styles.digitsDiv}>
            <span>-</span>
            <span><img src={mouth1} alt="" /></span>
            <span><img src={mouth2} alt="" /></span>
            <span><img src={mouth3} alt="" /></span>
            <span><img src={mouth4} alt="" /></span>
            <span><img src={mouth5} alt="" /></span>
            <span><img src={mouth6} alt="" /></span>
            <span><img src={mouth7} alt="" /></span>
            <span><img src={mouth8} alt="" /></span>
            <span><img src={mouth9} alt="" /></span>
          </div>
        </div>
      </div>
      <button className={styles.bttn} onClick={rouletteHandler}>룰렛 뿅</button>
    </div>
  );
};

export default Draw;
