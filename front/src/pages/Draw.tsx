import styles from "./Draw.module.scss"

const Draw = () => {
  const rouletteHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    let rand = "" + (Math.floor(Math.random() * 9999 + 1));
    console.log(rand)

    while(rand.length !== 4) {
      rand = "0" + rand;
    };
    
    console.log(rand)

    document.getElementsByClassName(`${styles.digitsDiv}`)[0].className = `${styles.digitsDiv}`;
    document.getElementsByClassName(`${styles.digitsDiv}`)[1].className = `${styles.digitsDiv}`;
    document.getElementsByClassName(`${styles.digitsDiv}`)[2].className = `${styles.digitsDiv}`;
    document.getElementsByClassName(`${styles.digitsDiv}`)[3].className = `${styles.digitsDiv}`;
    
    let spin0 = "spin" + rand.charAt(0);
    let spin1 = "spin" + rand.charAt(1);
    let spin2 = "spin" + rand.charAt(2);
    let spin3 = "spin" + rand.charAt(3);
    console.log(styles.spin0)

    setTimeout(function() {
      document.getElementsByClassName(`${styles.digitsDiv}`)[0].className =
        `${styles.digitsDiv} ${styles[spin0]}`;
      document.getElementsByClassName(`${styles.digitsDiv}`)[1].className =
        `${styles.digitsDiv} ${styles[spin1]}`;
      document.getElementsByClassName(`${styles.digitsDiv}`)[2].className =
        `${styles.digitsDiv} ${styles[spin2]}`;
      document.getElementsByClassName(`${styles.digitsDiv}`)[3].className =
        `${styles.digitsDiv} ${styles[spin3]}`;
    }, 0);
  };

  return (
    <div>
      <div className={styles.counter}>
        <div className={styles.digitsContainer}>
          <div className={styles.digitsDiv}>
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
          </div>
        </div>
        <div className={styles.digitsContainer}>
          <div className={styles.digitsDiv}>
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
          </div>
        </div>
        <div className={styles.digitsContainer}>
          <div className={styles.digitsDiv}>
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
          </div>
        </div>
        <div className={styles.digitsContainer}>
          <div className={styles.digitsDiv}>
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
          </div>
        </div>
      </div>
      <button className={styles.bttn} onClick={rouletteHandler}>룰렛 뿅</button>
    </div>
  );
};

export default Draw;
