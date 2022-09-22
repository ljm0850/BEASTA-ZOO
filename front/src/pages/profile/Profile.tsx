import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../../api/connect";

import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Divider from '@mui/material/Divider';


import ethereum_logo from "../../image/ethereum_logo.svg";

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const Profile = () => {
  const account: string | undefined = useParams().account;

  const [reduceAccount, setReduceAccount] = useState("");
  const [nickname, setNickname] = useState("");
  const [bannerImgPath, setBannerImgPath] = useState("");
  const [profileImgPath, setProfileImgPath] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [userTier, setUserTier] = useState(0);
  const [firstDiscoverCount, setFirstDiscoverCount] = useState(0);

  // scss 쓸때 지워야 함.
  const [accountColor, setAccountColor] = useState("black")
  const [copy, setCopy] = useState("copy");

  const copyHandler = () => {
    if (account !== undefined) {
      navigator.clipboard.writeText(account);
      setCopy("copied!");
    }
  };

  const get_UserInfo = async () => {
    getUserInfo(account).then((res) => {
      setNickname(res.nickname);
      setBannerImgPath(res.banner_img_path);
      setProfileImgPath(res.profile_img_path);
      setProfileDescription(res.profile_description);
      setUserTier(res.tier);
      setFirstDiscoverCount(res.first_discover_count);
    });
  };

  useEffect(() => {
    get_UserInfo();

    if (account !== undefined) {
      setReduceAccount(account.slice(0, 6) + "..." + account.slice(38, 42));
    }
  }, []);

  return (
    <div style={{ marginTop: "110px" }}>
      {!bannerImgPath ? (
        // 프로필 배너가 없을 경우
        <div
          style={{
            display: "block",
            background: "#F7F8F9",
            height: "26vw",
            maxHeight: "320px",
          }}
        >
          {!profileImgPath ? (
            // 프로필 사진이 있을 경우
            <div
              style={{
                display: "flex",
                position: "relative",
                top: "55%",
                left: "70px",
                background: "gray",
                height: "20vw",
                width: "20vw",
                maxHeight: "170px",
                maxWidth: "170px",
                borderRadius: 100,
                border: "5px solid #fff",
                boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.3)",
              }}
            ></div>
          ) : (
            // 프로필 사진이 없을 경우
            <img src={profileImgPath} alt="profile image" />
          )}
        </div>
      ) : (
        // banner가 있을 경우
        <div
          style={{
            display: "block",
            background: bannerImgPath,
            height: "26vw",
            maxHeight: "320px",
          }}
        >
          {!profileImgPath ? (
            // 프로필 사진이 없을 경우
            <div
              style={{
                display: "flex",
                position: "relative",
                top: "55%",
                left: "70px",
                background: "gray",
                height: "20vw",
                width: "20vw",
                maxHeight: "170px",
                maxWidth: "170px",
                borderRadius: 100,
                border: "5px solid #fff",
                boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.3)",
              }}
            ></div>
          ) : (
            // 프로필 사진이 있을 경우
            <img src={profileImgPath} alt="profile image" />
          )}
        </div>
      )}

      <div style={{ marginTop: "80px", marginLeft: "50px" }}>
        <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
          {!nickname ? "unknown Javjong" : nickname}
        </div>

        <BootstrapTooltip title={<h2>{copy}</h2>}>
          <div
            style={{ display: "inline-block", cursor: "pointer", color: accountColor, fontSize: "1.3rem" }}
            onClick={copyHandler}
            onMouseOut={() => {
              setCopy("copy");
              setAccountColor("black")
            }}
            onMouseOver={() => {
              setCopy("copy");
              setAccountColor("gray")
            }}
          >
            <img style={{ width: "25px" }} src={ethereum_logo} alt="" />
            {reduceAccount}
          </div>
        </BootstrapTooltip>
      </div>
      <Divider />
    </div>
  );
};

export default Profile;
