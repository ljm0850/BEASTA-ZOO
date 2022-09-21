import { useState, useEffect, createContext } from "react";
import Web3 from "web3";
import MetaMaskOnboarding from "@metamask/onboarding";
import { checkUser, connectAPI, createUser } from "../api/connect";

export const AppContext = createContext<Value>({
  state: {
    account: "",
    balance: 0,
    ssfBalance: "",
    nickname: "",
    profileImgPath: "",
    bannerImgPath: "",
    profileDescription: "",
  },
  actions: {
    handleConnect: () => {},
    getBalance: () => {},
    getSsfBalance: () => {},
    retainConnect: () => {},
  },
});

type ChildrenProps = {
  children: JSX.Element;
  value: Value;
};

// account, balance, ssfBalance, nickname, profileImgPath, backProfileImageUrl
type State = {
  account: string;
  balance: number;
  ssfBalance: string;
  nickname: string;
  profileImgPath: string;
  bannerImgPath: string;
  profileDescription: string;
};

type Action = {
  handleConnect: () => void;
  getBalance: () => void;
  getSsfBalance: () => void;
  retainConnect: () => void;
};

type Value = {
  state: State;
  actions: Action;
};

export const AppProvider = ({ children }: { children: JSX.Element }) => {
  const onboarding = new MetaMaskOnboarding();
  const [account, setAccount] = useState(""); // 지갑
  const [balance, setBalance] = useState(0); // 잔액
  const [nickname, setNickname] = useState(""); // 닉네임
  const [profileImgPath, setProfileImgPath] = useState(""); // 프로필 이미지
  const [bannerImgPath, setBannerImgPath] = useState(""); // 프로필 뒷배경 이미지
  const [profileDescription, setProfileDescription] = useState(""); // 자기소개

  const [ssfBalance, setSsfBalance] = useState(""); // SSF
  const [network, setNetwork] = useState(""); // 네트워크

  const web3 = new Web3(window.ethereum);

  const retainConnect = async () => {
    const ac = await window.ethereum.request({
      method: "eth_accounts",
    })

    if (ac[0] !== undefined) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      await getUserInfo(accounts[0]);
    }

    // web3.eth.getAccounts().then(async (res) => {
    //   const accounts = res[0]
    //   await setAccount(accounts);
    //   await getUserInfo(accounts);
    // });

      // setAccount(accounts)
      // await getUserInfo(accounts)

      console.log("account");
      console.log(account);
      console.log("balance");
      console.log(balance);
      console.log("nickname");
      console.log(nickname);

  };

  const handleConnect = async () => {

  if (account) {
    setAccount("");
  } else {
    // try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        await getUserInfo(accounts[0]);
      } else {
        alert("install Metamask"); // 이후 메타마스크 설치 페이지로 이동시킬 것
        onClickInstall();
    }
    // } catch (err) {
    //   console.log(err)
    // }
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
        const profileDescription = res.profile_description

        setProfileImgPath(
          profileImgPath === "" ? "default image" : profileImgPath
        );
        setBannerImgPath(
          bannerImgPath === "" ? "default image" : bannerImgPath
        );
        setNickname(nickname === "" ? "Javjoung" : nickname);
        setProfileDescription(profileDescription)
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
          const profileDescription = res.profile_description
  
          setProfileImgPath(
            profileImgPath === "" ? "default image" : profileImgPath
          );
          setBannerImgPath(
            bannerImgPath === "" ? "default image" : bannerImgPath
          );
          setNickname(nickname === "" ? "Javjoung" : nickname);
          setProfileDescription(profileDescription)
        }) .catch((err) => {
          console.log(err);
        })
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    retainConnect();
    // handleConnect();
  }, []);

  useEffect(() => {
    if (account) {
      getBalance();
      // getSsfbalance()
    }
  }, [account]);

  // 현재 잔고 가져오기
  const getBalance = async () => {
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      // console.log(balance);
      let dec = parseInt(balance);
      setBalance(dec);
    } catch (err) {
      console.log(err);
    }
  };


  // JAV 토큰으로 변환하기
  // 현재 SSF 가져오기
  const getSsfBalance = async () => {
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
  };


  const onClickInstall = () => {
    onboarding.startOnboarding();
  };


  const value: Value = {
    state: {
      account,
      balance,
      ssfBalance,
      nickname,
      profileImgPath,
      bannerImgPath,
      profileDescription
    },
    actions: { handleConnect, getBalance, getSsfBalance, retainConnect },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
