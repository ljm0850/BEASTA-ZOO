import { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import MetaMaskOnboarding from "@metamask/onboarding";
import { checkUser, createUser } from "../api/connect";

import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { ABI } from "../common/ABI";
import UpdateUserInfo from "./modal/UpdateUserInfo";

export interface State extends SnackbarOrigin {
  openSnackbar: boolean;
}

interface UserInfo {
  banner_img_path: string | null;
  first_discover_count: number;
  nickname: string | null;
  profile_description: string | null;
  profile_img_path: string | null;
  tier: number;
  token: number;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
  drawerClose: () => void;
}

const Login = (props: Props) => {

  const [ dummy, setDummy ] = useState<UserInfo>({
    banner_img_path: "",
    first_discover_count: 0,
    nickname: "",
    profile_description: "",
    profile_img_path: "",
    tier: 0,
    token: 0,
  });
  const { drawerClose } = props;

  const navigate = useNavigate();
  const onboarding = new MetaMaskOnboarding();
  const web3 = new Web3(window.ethereum);

  const isMetaMaskInstalled = () => {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  };

  const onClickLoginButton = () => {
    if (!isMetaMaskInstalled()) {
      onClickInstall();
    } else {
      LoginHandler();
    }
  };

  const LoginHandler = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // 얻은 지갑을 이용 로그인 과정
      await get_UserInfo(accounts[0]);

      const chainId = 31221;
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(chainId) }],
      });

      await window.ethereum
        .request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: ABI.CONTRACT_ADDRESS.TOKEN_ADDRESS,
              symbol: "JAV",
              decimals: 0,
              image:
                "https://blog.kakaocdn.net/dn/drGCMU/btrMHIzOvBF/5GC5q2TVGKy8E2Hj2qYQj1/tfile.svg",
            },
          },
        })
        .then((success: any) => {
          if (success) {
          } else {
            throw new Error("Something went wrong.");
          }
        })
        .catch(console.error);
    } catch (err) {
      console.log(err);
    }
  };

  // 계정 정보 얻어오기
  // 기존에 계정 정보가 없을 경우 createUserInfo를 통해 해당 지갑에 대한 새 계정을 생성한다.
  const get_UserInfo = async (account: string) => {
    // try {
    checkUser(account)
      .then((res) => {
        const profileImgPath = res.profile_img_path;
        const bannerImgPath = res.banner_img_path;
        const nickname = res.nickname;
        const profileDescription = res.profile_description;

        sessionStorage.setItem("isLogined", "true");
        sessionStorage.setItem(
          "nickname",
          nickname === null ? "Javjoung" : nickname
        );
        sessionStorage.setItem(
          "profileImgPath",
          profileImgPath === null ? "https://placehold.jp/E6E6E6/E6E6E6/150x150.png" : profileImgPath
        );
        sessionStorage.setItem(
          "bannerImgPath",
          bannerImgPath === null ? "default image" : bannerImgPath
        );
        sessionStorage.setItem("profileDescription", profileDescription);
        sessionStorage.setItem("account", account);
        navigate("/");
      })
      .catch((err) => {
        setSnackbarOpen(true);
        createUserInfo(account);
      });
  };

  // 계정 정보 생성
  const createUserInfo = async (account: string) => {
    await createUser(account)
      .then((res) => {
        const profileImgPath = "https://placehold.jp/E6E6E6/E6E6E6/150x150.png";
        const bannerImgPath = res.banner_img_path;
        const nickname = res.nickname;
        const profileDescription = res.profile_description;

        sessionStorage.setItem("isLogined", "true");
        sessionStorage.setItem("nickname", nickname);
        sessionStorage.setItem("profileImgPath", profileImgPath);
        sessionStorage.setItem("bannerImgPath", bannerImgPath);
        sessionStorage.setItem("profileDescription", profileDescription);
        sessionStorage.setItem("account", account);
      })
      .catch((err) => {
        console.log(err);
      });
    
    await setModalOpen(true)
  };

  const onClickInstall = () => {
    onboarding.startOnboarding();
  };

  // 첫 로그인 시 사용할 snackbar
  const [openSnackbar, setSnackbarOpen] = useState(false);
  const sanckbarHandleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // 회원정보 수정 모달
  const [openModal, setModalOpen] = useState(false);
  const modalHandleClose = () => {
    setModalOpen(false)
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={onClickLoginButton}
        sx={{
          background: "#FFC42E",
          "&:hover": {
            background: "#FDB909",
          },
        }}
      >
        로그인
      </Button>
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={sanckbarHandleClose}
        style={{zIndex: "2000"}}
      >
        <Alert
          onClose={sanckbarHandleClose}
          severity="info"
          sx={{ width: "100%", zIndex: "2000"}}
        >
          첫 로그인이시군요! 회원정보를 입력해주세요!
        </Alert>
      </Snackbar>

      <UpdateUserInfo openModal={openModal} modalHandleClose={modalHandleClose} drawerClose={drawerClose} customFuntion={setDummy} customValue={dummy}/>

    </div>
  );
};

export default Login;
