import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo, updateUserInfo } from "../../api/connect";

import * as IPFS from "ipfs-core";

import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

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

interface UserInfo {
  banner_img_path: string | null;
  first_discover_count: number;
  nickname: string | null;
  profile_description: string | null;
  profile_img_path: string | null;
  tier: number;
  token: number;
}

const Profile = () => {
  const account: string | undefined = useParams().account;

  const [ user, setUser ] = useState<UserInfo>({
    banner_img_path: "",
    first_discover_count: 0,
    nickname: "",
    profile_description: "",
    profile_img_path: "",
    tier: 0,
    token: 0,
  })

  const [reduceAccount, setReduceAccount] = useState("");
  // const [nickname, setNickname] = useState("");
  // const [bannerImgPath, setBannerImgPath] = useState("");
  // const [profileImgPath, setProfileImgPath] = useState("");
  // const [profileDescription, setProfileDescription] = useState("");
  // const [userTier, setUserTier] = useState(0);
  // const [firstDiscoverCount, setFirstDiscoverCount] = useState(0);

  const [loginedAccount, setLoginedAccount] = useState("");
  const getAccount = async () => {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    setLoginedAccount(accounts[0]);
  };

  // scss 쓸때 지워야 함.
  const [accountColor, setAccountColor] = useState("black");
  const [copy, setCopy] = useState("copy");

  const copyHandler = () => {
    if (account !== undefined) {
      navigator.clipboard.writeText(account);
      setCopy("copied!");
    }
  };

  const get_UserInfo = async () => {
    await getUserInfo(account).then((res) => {
      setUser({...res});

      // setNickname(res.nickname);
      // setBannerImgPath(res.banner_img_path);
      // setProfileImgPath(res.profile_img_path);
      // setProfileDescription(res.profile_description);
      // setUserTier(res.tier);
      // setFirstDiscoverCount(res.first_discover_count);
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


  // ipfs 부분

  // IPFS를 이용해 Hash값을 얻어내는 과정
  // const [fileUrl, updateFileUrl] = useState(``);
  // async function onChange(e: any) {
  //   const file = e.target.files[0];
  //   try {
  //     // const IPFS = require('ipfs-core')
  //     const ipfs = await IPFS.create()
  //     const added = await ipfs.add(file);
  //     console.log(added)
  //     const url = `https://ipfs.io/ipfs/${added.path}`;
  //     updateFileUrl(url);
  //   } catch (error) {
  //     console.log("Error uploading file: ", error);
  //   }
  // }

  const changeProfileHandler = async (e: any) => {
    const file = e.target.files[0];
    try {
      const ipfs = await IPFS.create();
      const added = await ipfs.add(file);
      const url = `https://ipfs.io/ipfs/${added.path}`;

      // { banner_img_path:"",
      //   create_date:"",
      //   first_discover_count:0,
      //   nickname:"",
      //   profile_description:"",
      //   profile_img_path:"https://ipfs.io/ipfs/QmNoZihxTGmTmRucqakCRCFYRYwmXTwSBhQ1qgpPQEC8ne",
      //   tier:0,
      //   token:0,
      //   user_id:0,
      //   wallet_address:""
      // }
      const option = {
        ...user,
        profile_img_path: url,
      }

      updateUserInfo(loginedAccount, option)
        .then((res) => {
          console.log(res)
        }) .catch((err) => {
          console.log(err)
        })
      
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const changeBannerHandler = async (e: any) => {
    const file = e.target.files[0];
    try {
      const ipfs = await IPFS.create();
      const added = await ipfs.add(file);
      const url = `https://ipfs.io/ipfs/${added.path}`;
      const option = {
        ...user,
        banner_img_path: url
      }
      updateUserInfo(loginedAccount, option)
        .then((res) => {
          console.log(res)
        }) .catch((err) => {
          console.log(err)
        })
      
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  return (
    <div style={{ marginTop: "110px" }}>
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
          {!user.profile_img_path ? (
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
            <img src={user.profile_img_path} alt="profile image" />
          )}
        </div>
      ) : (
        // banner가 있을 경우
        <div
          style={{
            display: "block",
            background: user.banner_img_path,
            height: "26vw",
            maxHeight: "320px",
          }}
        >
          {!user.profile_img_path ? (
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
            <img src={user.profile_img_path} alt="profile image" />
          )}
        </div>
      )}

      <div style={{ marginTop: "80px", marginLeft: "50px" }}>
        <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
          {!user.nickname ? "unknown Javjong" : user.nickname}
        </div>

        <BootstrapTooltip title={<h2>{copy}</h2>}>
          <div
            style={{
              display: "inline-block",
              cursor: "pointer",
              color: accountColor,
              fontSize: "1.3rem",
            }}
            onClick={copyHandler}
            onMouseOut={() => {
              setCopy("copy");
              setAccountColor("black");
            }}
            onMouseOver={() => {
              setCopy("copy");
              setAccountColor("gray");
            }}
          >
            <img style={{ width: "25px" }} src={ethereum_logo} alt="" />
            {reduceAccount}
          </div>
        </BootstrapTooltip>
      </div>
      <Divider />

      <div>testing area</div>
      {/* <div>
        <input type="file" onChange={onChange} />
        {fileUrl && <img src={fileUrl} width="600px" />}
      </div> */}

      <div>보고있는 프로필 {account}</div>
      <div>로그인된 계좌 {loginedAccount}</div>

      <div>
        {account === loginedAccount ? (
          <div>
            프로필 사진 변경
            <input type="file" onChange={changeProfileHandler} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>
        {account === loginedAccount ? (
          <div>
            배경 사진 변경
            <input type="file" onChange={changeBannerHandler} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;
