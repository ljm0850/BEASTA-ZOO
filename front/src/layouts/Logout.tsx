import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const Logout = () => {
  const navigate = useNavigate();

  const onClickLogoutButton = () => {
    sessionStorage.removeItem("isLogined");
    sessionStorage.removeItem("profileDescription");
    sessionStorage.removeItem("profileImgPath");
    sessionStorage.removeItem("nickname");
    sessionStorage.removeItem("bannerImgPath");
    navigate("/");
  };

  return <LogoutIcon onClick={onClickLogoutButton}></LogoutIcon>;
};

export default Logout;
