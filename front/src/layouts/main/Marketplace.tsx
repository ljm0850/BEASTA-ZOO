import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Marketplace.module.scss";

import Items from "../../pages/market/Items";

const Marketplace = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.MPBody}>
        <div className={styles.MPContainer}>
          <p className={styles.MPTitle}>Marketplace</p>
          <p className={styles.MPDetail}>Jav를 자유롭게 거래해보세요</p>
        </div>
        <button
          onClick={() => {
            navigate("/market");
          }}
          className={styles.marketNav}
        >
          View all
        </button>
      </div>
      <Items page={0} size={4} search={"0000000"} haveCompleted={0} sort={0} />
    </div>
  );
};

export default Marketplace;
