import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo, updateUserInfo } from "../../api/connect";

import * as IPFS from "ipfs-core";

import CircularProgress from "@mui/material/CircularProgress";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import ethereum_logo from "../../image/ethereum_logo.svg";

import styles from "./Profile.module.scss";
import MyJavs from "./MyJavs";

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

interface UserInfo {
  banner_img_path: string | null;
  first_discover_count: number;
  nickname: string | null;
  profile_description: string | null;
  profile_img_path: string | null;
  tier: number;
  token: number;
}

export interface State extends SnackbarOrigin {
  open: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = () => {
  const account: string | undefined = useParams().account;

  const [spinner, setSpinner] = useState(false);

  const [user, setUser] = useState<UserInfo>({
    banner_img_path: "",
    first_discover_count: 0,
    nickname: "",
    profile_description: "",
    profile_img_path: "",
    tier: 0,
    token: 0,
  });

  const [reduceAccount, setReduceAccount] = useState("");
  const [loginedAccount, setLoginedAccount] = useState("");
  const getAccount = async () => {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    setLoginedAccount(accounts[0]);
  };

  // 카피 버튼
  const [copy, setCopy] = useState("copy");

  const copyHandler = () => {
    if (account !== undefined) {
      navigator.clipboard.writeText(account);
      setCopy("copied!");
    }
  };

  const get_UserInfo = async () => {
    await getUserInfo(account).then((res) => {
      setUser({ ...res });
    });
  };

  useEffect(() => {
    get_UserInfo();

    if (sessionStorage.getItem("isLogined") === "true") {
      getAccount();
    }

    if (account !== undefined) {
      setReduceAccount(account.slice(0, 6) + "..." + account.slice(38, 42));
    }
  }, []);

  // ipfs 사용 부분
  // 프로필 사진 변경
  const changeProfileHandler = async (e: any) => {
    setSpinner(true);
    const file = e.target.files[0];
    try {
      const ipfs = await IPFS.create({ repo: "ok" + Math.random() });
      const added = await ipfs.add(file);
      const url = `https://ipfs.io/ipfs/${added.path}`;
      const option = {
        ...user,
        profile_img_path: url,
      };

      console.log(url);
      updateUserInfo(loginedAccount, option)
        .then((res) => {
          setUser({
            ...res,
            profile_img_path: res.profile_img_path,
          });
          setSpinner(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error uploading file: ", error);
      setSpinner(false);
      setState({ open: true, vertical: "top", horizontal: "center" });
    }
  };

  // 배너 변경
  const changeBannerHandler = async (e: any) => {
    setSpinner(true);
    const file = e.target.files[0];
    try {
      const ipfs = await IPFS.create({ repo: "ok" + Math.random() });
      const added = await ipfs.add(file);
      const url = `https://ipfs.io/ipfs/${added.path}`;
      const option = {
        ...user,
        banner_img_path: url,
      };
      updateUserInfo(loginedAccount, option)
        .then((res) => {
          setUser({
            ...res,
            banner_img_path: res.banner_img_path,
          });
          setSpinner(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error uploading file: ", error);
      setSpinner(false);
      setState({ open: true, vertical: "top", horizontal: "center" });
    }
  };

  // Snackbar
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  //////

  /// Tabs
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div>
      {spinner && (
        <div className={styles.spinner}>
          <CircularProgress />
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          에러가 발생했습니다. 새로고침 후 다시 시도해 보세요.
        </Alert>
      </Snackbar>

      <div>
        {account?.toLowerCase() === loginedAccount ? (
          // 접속 계정, 프로필 동일 => 프로필 변경 가능
          <div>
            {!user.banner_img_path ? (
              // 배너가 없을 경우
              <label htmlFor="banner" className={styles.banner}>
                <div className={styles.bannerEditIcon}>
                  <EditIcon />
                </div>
                <input
                  style={{ visibility: "hidden" }}
                  type="file"
                  id="banner"
                  name="banner"
                  onChange={changeBannerHandler}
                />
                {!user.profile_img_path ? (
                  // 프로필 사진이 없을 경우
                  <label htmlFor="profileImg" className={styles.profileImg}>
                    <div className={styles.profileImgEditIcon}>
                      <EditIcon />
                    </div>
                    <input
                      style={{ visibility: "hidden" }}
                      type="file"
                      id="profileImg"
                      name="profileImg"
                      onChange={changeProfileHandler}
                    />
                  </label>
                ) : (
                  // 프로필 사진이 있을 경우
                  <label
                    htmlFor="profileImg"
                    className={styles.profilePosition}
                  >
                    <input
                      style={{ visibility: "hidden" }}
                      type="file"
                      id="profileImg"
                      name="profileImg"
                      onChange={changeProfileHandler}
                    />
                    <img
                      className={styles.existProfileImg}
                      src={user.profile_img_path}
                      alt="profile"
                    />
                    <div className={styles.existprofileImgEditIcon}>
                      <EditIcon />
                    </div>
                  </label>
                )}
              </label>
            ) : (
              // banner가 있을 경우
              <label
                htmlFor="banner"
                style={{ backgroundImage: `url(${user.banner_img_path})` }}
                className={styles.existBannerImg}
              >
                <div className={styles.exisbannerImgEditIcon}>
                  <EditIcon />
                </div>
                <input
                  style={{ visibility: "hidden" }}
                  type="file"
                  id="banner"
                  name="banner"
                  onChange={changeBannerHandler}
                />
                {!user.profile_img_path ? (
                  // 프로필 사진이 없을 경우
                  <label htmlFor="profileImg" className={styles.profileImg}>
                    <div className={styles.profileImgEditIcon}>
                      <EditIcon />
                    </div>
                    <input
                      style={{ visibility: "hidden" }}
                      type="file"
                      id="profileImg"
                      name="profileImg"
                      onChange={changeProfileHandler}
                    />
                  </label>
                ) : (
                  // 프로필 사진이 있을 경우
                  <label
                    htmlFor="profileImg"
                    className={styles.profilePosition}
                  >
                    <input
                      style={{ visibility: "hidden" }}
                      type="file"
                      id="profileImg"
                      name="profileImg"
                      onChange={changeProfileHandler}
                    />
                    <img
                      className={styles.existProfileImg}
                      src={user.profile_img_path}
                      alt="profile"
                    />
                    <div className={styles.existprofileImgEditIcon}>
                      <EditIcon />
                    </div>
                  </label>
                )}
              </label>
            )}
          </div>
        ) : (
          // 현재 프로필 != 접속 계정 => 프로필 변경 불가
          <div>
            {!user.banner_img_path ? (
              // 프로필 배너가 없을 경우
              <div
                style={{
                  display: "block",
                  background: "#F7F8F9",
                  height: "26vw",
                  maxHeight: "320px",
                }}
              >
                <div className={styles.padding}></div>
                {!user.profile_img_path ? (
                  // 프로필 사진이 없을 경우
                  <div className={styles.nonAuthProfile}></div>
                ) : (
                  // 프로필 사진이 있을 경우
                  <div className={styles.nonAuthProfilePosition}>
                    <img
                      className={styles.existProfileImg}
                      src={user.profile_img_path}
                      alt="profile"
                    />
                  </div>
                )}
              </div>
            ) : (
              // banner가 있을 경우
              <div
                className={styles.nonAuthBanner}
                style={{
                  backgroundImage: `url(${user.banner_img_path})`,
                }}
              >
                <div className={styles.padding}></div>
                {!user.profile_img_path ? (
                  // 프로필 사진이 없을 경우
                  <div className={styles.nonAuthProfile}></div>
                ) : (
                  // 프로필 사진이 있을 경우
                  <div className={styles.nonAuthProfilePosition}>
                    <img
                      className={styles.existProfileImg}
                      src={user.profile_img_path}
                      alt="profile"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: "80px", marginLeft: "50px", marginRight: "50px" }}>
        <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
          {!user.nickname ? "unknown Javjong" : user.nickname}
        </div>

        <BootstrapTooltip title={<div>{copy}</div>}>
          <div
            className={styles.myAccount}
            onClick={copyHandler}
            onMouseOut={() => {
              setCopy("copy");
            }}
            onMouseOver={() => {
              setCopy("copy");
            }}
          >
            <div className={styles.account}>
              <img style={{ width: "20px" }} src={ethereum_logo} alt="" />
              <div>{reduceAccount}</div>
            </div>
          </div>
        </BootstrapTooltip>
        <div className={styles.description}>{user.profile_description}</div>
      </div>

      {/* 구분선 */}

      <Box sx={{ margin: "10px 40px 0 40px" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              textColor="inherit"
              TabIndicatorProps={{ style: { background: "black" } }}
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab
                label="My Javs"
                style={{
                  textTransform: "none",
                  fontWeight: "600",
                  fontSize: "1rem",
                }}
                value="1"
              />
              <Tab
                label="Favorited"
                style={{
                  textTransform: "none",
                  fontWeight: "600",
                  fontSize: "1rem",
                }}
                value="2"
              />
              <Tab
                label="Collections"
                disabled
                style={{
                  textTransform: "none",
                  fontWeight: "600",
                  fontSize: "1rem",
                }}
                value="3"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <MyJavs account={account} />
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Profile;
