import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Marketplace.module.scss";

import Items from "../../pages/market/Items";
import { Button } from "@mui/material";

const Marketplace = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h3>Marketplace</h3>
      <p>Jav를 자유롭게 거래해보세요</p>
      <Button
          onClick={() => {
            navigate("/market");
          }}
          variant="contained"
          size="large"
          className={styles.marketNav}
        >
          View all
        </Button>
      <Items page={0} size={4} search={"0000000"} />
    </div>
  );
};

export default Marketplace;