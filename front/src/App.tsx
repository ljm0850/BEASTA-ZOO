import Router from './routes';

import { useState, useEffect } from 'react';
import Web3 from 'web3';
import MetaMaskOnboarding from "@metamask/onboarding";
import { connectAPI } from './api/connect';
import axios from 'axios';
import DashboardNavbar from './layouts/main/DashboardNavbar';

function App() {
  
  const { ethereum } = window;
  const onboarding = new MetaMaskOnboarding();
  // web3 연동
  // const [web3, setWeb3] = useState();
  const [account, setAccount] = useState(''); // 지갑
  const [balance, setBalance] = useState(''); // 잔액
  const [nickname, setNickname] = useState('') // 닉네임
  const [profileImageUrl, setProfileImageUrl] = useState(''); // 프로필 이미지
  const [backProfileImageUrl, setBackProfileImageUrl] = useState('') // 프로필 뒷배경 이미지

  const [ssfBalance, setSsfBalance] = useState('');
  const [network, setNetwork] = useState(''); // 네트워크

  const web3 = new Web3(window.ethereum);

  const handleConnect = async () => {
    if (account) {
      setAccount('')
    } else {
      try {
        if(window.ethereum) {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          })

          setAccount(() => accounts[0])
          // await getUserInfo(accounts[0])
        } else {
          alert("install Metamask") // 이후 메타마스크 설치 페이지로 이동시킬 것 
          onClickInstall();
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  // 계정 정보 얻어오기
  // 기존에 계정 정보가 없을 경우 createUserInfo를 통해 해당 지갑에 대한 새 계정을 생성한다.
  const getUserInfo = async (account: string) => {
    try {
      const res = await axios.get(`https://j7c108.p.ssafy.io:8080/user/info/${account}`)

      // 계정이 존재하지 않을 경우
      if (res.status === 204) {
        createUserInfo(account)
      } else if (res.status === 200) {
        const profileImageUrl = res.data.profileImageUrl;
        const backProfileImageUrl = res.data.backProfileImageUrl;
        const nickname = res.data.nickname;

        setProfileImageUrl(profileImageUrl === "" ? 'default image' : profileImageUrl);
        setBackProfileImageUrl(backProfileImageUrl === "" ? "default image" : backProfileImageUrl);
        setNickname(nickname === "" ? "Javjoung" : nickname);
      }
    } catch(err) {
      console.log(err)
    }
  }

  // 계정 정보 생성
  const createUserInfo = async (account: string) => {
    try {
      const data = {
        address: account,
        profileImageUrl : '',
        backProfileImageUrl : '',
        nickname: ''
      }
      const res = await axios.post('https://j7c108.p.ssafy.io:8080/user', data)
      const profileImageUrl = res.data.profileImageUrl;
      const backProfileImageUrl = res.data.backProfileImageUrl;
      const nickname = res.data.nickname;

      setProfileImageUrl(profileImageUrl === "" ? 'default image' : profileImageUrl);
      setBackProfileImageUrl(backProfileImageUrl === "" ? "default image" : backProfileImageUrl);
      setNickname(nickname === "" ? "Javjoung" : nickname);
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    // handleConnect()
  }, [])

  useEffect(() => {
    if (account) {
      getBalance()
      // getSsfbalance()
    }
  }, [account])

  // 현재 잔고 가져오기
  const getBalance = async () => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest']
      })
      console.log(balance)

      setBalance(balance)
    } catch(err) {
      console.log(err)
    }
  }

  // 현재 SSF 가져오기 
  // const getSsfBalance = async () => {
  //   try {
  //     const ssafyToken = new web3.eth.Contract(
  //       ABI.CONTRACT_ABI.ERC_ABI,
  //       process.env.REACT_APP_ERC2_CA,
  //     )

  //     console.log(ssafyToken)

  //     await ssafyToken.methods
  //       .balanceOf(account)
  //       .call()
  //       .then((result: string) => {
  //         console.log(result)
  //         setSsfBalance(result)
  //       }).catch((err: any) => {console.log('ssafyToken blance of error', err)})
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }



  // // 메타마스크 설치 유무 확인
  // const isMetamaskInstalled = () => {
  //   return Boolean(ethereum && ethereum.isMetaMask)
  // }

  // const onClickButton = () => {
  //   if (!isMetamaskInstalled()) {
  //     onClickInstall();
  //   } else {
  //     onClickConnect();
  //   }
  // }

  const onClickInstall = () => {
    onboarding.startOnboarding();
  };

  // 메타마스크 연결
  // const onClickConnect = async () => {
  //   try {
  //     // 지갑 주소 세팅
  //     await ethereum.request({method: "eth_requestAccounts"});
  //     const accounts = await ethereum.request({method: "eth_accounts"});
  //     setAccount(accounts[0])
  //     console.log(account)
      
  //     // SSF network 준비
  //     const chainId = 31221
  //     const rpcurl = "http://20.196.209.2:8545/"

  //     console.log(web3.utils.toHex(chainId))
  //     //
  //     await ethereum.request({
  //       method: "wallet_switchEthereumChain",
  //       params: [{ chainId: web3.utils.toHex(chainId) }]
  //     })

      
  //     await ethereum.request({
  //       method: "wallet_watchAsset",
  //       params: {
  //         type: "ERC20",
  //         options: {
  //           address: "0x0c54E456CE9E4501D2c43C38796ce3F06846C966",
  //           symbol: "SSF",
  //           decimals: 0,
  //           image: "",
  //         },
  //       },
  //     })
  //     .then((success: any) => {
  //       if (success) {
  //         console.log('SSF successfully added to wallet!')
  //       } else {
  //         throw new Error("something went wrong");
  //       }
  //     }).catch(console.error)

  //   } catch (error) {
  //     console.log("메타마스크 연결 중 예상치 못한 오류가 발생했습니다.")
  //   }
  // };


  return (
    <div className="App">
      <DashboardNavbar/>
      <Router />
      {/* <button onClick={connectWallet}>메타마스크 지갑 연결해보기</button> */}
      <div></div>
      {/* <button onClick={onClickButton}>드가보자</button> */}
      <div>지갑 잔고 : {balance}</div>
      {/* <button onClick={getBalance}>잔액 확인</button> */}
      <div><button onClick={handleConnect}>지갑 연결해보기</button></div>
    </div>
  );
}

export default App;