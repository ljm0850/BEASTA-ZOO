import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import MetaMaskOnboarding from "@metamask/onboarding";
import { checkUser, createUser } from "../api/connect";

import Button from "@mui/material/Button";
import { ABI } from "../common/ABI";

const Login = () => {
  const navigate = useNavigate();
  const onboarding = new MetaMaskOnboarding();
  const [account, setAccount] = useState(""); // 지갑

  const [ssfBalance, setSsfBalance] = useState(""); // SSF
  const [network, setNetwork] = useState(""); // 네트워크

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
      setAccount(accounts[0]);
      // 얻은 지갑을 이용 로그인 과정
      await getUserInfo(accounts[0]);

      const chainId = 31221;
      const rpcurl = "http://20.196.209.2:8545";

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
  const getUserInfo = async (account: string) => {
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
          profileImgPath === null ? "default image" : profileImgPath
        );
        sessionStorage.setItem(
          "bannerImgPath",
          bannerImgPath === null ? "default image" : bannerImgPath
        );
        sessionStorage.setItem("profileDescription", profileDescription);
        sessionStorage.setItem("account", account);
        window.location.reload();
        navigate("/");
      })
      .catch((err) => {
        alert("처음 접속하시는군요! 회원가입을 진행합니다.");
        createUserInfo(account);
      });
  };

  // 계정 정보 생성
  const createUserInfo = async (account: string) => {
    try {
      createUser(account)
        .then((res) => {
          const profileImgPath = res.profile_img_path;
          const bannerImgPath = res.banner_img_path;
          const nickname = res.nickname;
          const profileDescription = res.profile_description;

          sessionStorage.setItem("isLogined", "true");
          sessionStorage.setItem("nickname", nickname);
          sessionStorage.setItem("profileImgPath", profileImgPath);
          sessionStorage.setItem("bannerImgPath", bannerImgPath);
          sessionStorage.setItem("profileDescription", profileDescription);
          navigate("/");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   if (account) {
  //     getBalance();
  //     // getSsfbalance()
  //   }
  // }, [account]);

  // 현재 잔고 가져오기
  // const getBalance = async () => {
  //   try {
  //     const balance = await window.ethereum.request({
  //       method: "eth_getBalance",
  //       params: [account, "latest"],
  //     });
  //     // console.log(balance);
  //     let dec = parseInt(balance);
  //     setBalance(dec);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // JAV 토큰으로 변환하기
  // 현재 SSF 가져오기
  // const getSsfBalance = async () => {
  // try {
  //   const ssafyToken = new web3.eth.Contract(
  //     // ABI.CONTRACT_ABI.ERC_ABI,
  //     process.env.REACT_APP_ERC2_CA,
  //   )
  //   console.log(ssafyToken)
  //   await ssafyToken.methods
  //     .balanceOf(account)
  //     .call()
  //     .then((result: string) => {
  //       console.log(result)
  //       setSsfBalance(result)
  //     }).catch((err: any) => {console.log('ssafyToken blance of error', err)})
  // } catch(err) {
  //   console.log(err)
  // }
  // };

  const onClickInstall = () => {
    onboarding.startOnboarding();
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
    </div>
  );
};

export default Login;
