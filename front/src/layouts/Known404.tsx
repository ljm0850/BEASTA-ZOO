import { useNavigate } from "react-router-dom";
import styles from "./Known404.module.scss";

const Known404 = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.sections}>
        <div>404</div>
        <div>요청을 찾을 수 없습니다.</div>
        <div onClick={() => {navigate("/")}}>돌아가기</div>
      </div>
    </div>
  );
};

export default Known404;
