import { Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Login from "../../layouts/Login"
// import Draw from "../Draw";
import { useEffect, useState } from "react";
import styles from "./MainPage.module.scss";


import RecentlyCollections from "../../layouts/main/RecentlyCollections";
import Marketplace from "../../layouts/main/Marketplace";
import CollectorRanking from "../../layouts/main/CollectorRanking";
import SeasonCarousel from "../../layouts/main/SeasonCarousel";
import FAQ from "../../layouts/main/FAQ";

import banner from "../../image/mainPage/banner.png";
import guide from "../../image/mainPage/guide.png";

const MainPage = () => {
  const navigate = useNavigate();
  
  const userNickname = sessionStorage.getItem('nickname');

  // 임시 프로필 이동 버튼 
  const [ account, setAccount ] = useState("")
  
  const getAccount = async () => {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    setAccount(accounts[0]);
  };

  useEffect(() => {
    getAccount()
  }, [])

  const profileMoveHandler = () => {
    navigate(`user/${account}`)
  }


  return (
    <div className={styles.mainBody}>
      <Box sx={{ width: "75%", margin: "5% 15% 0 15%" }}>
        { sessionStorage.getItem("isLogined") && <p>Welcome, {userNickname}</p>}
        <div className={styles.mainBanner}>
          <img src={banner} alt="banner" onClick={() => {navigate("/market/draw")}} className={styles.banner} />
          <img src={guide} alt="banner" className={styles.guide} />
        </div>
        <RecentlyCollections />
        <Marketplace />
        <CollectorRanking />
      </Box>
      <SeasonCarousel />
      <Box sx={{ margin: "72px" }}>
        <FAQ />
      </Box>
      <Login></Login>
      { sessionStorage.getItem("isLogined") && <Button variant="contained" onClick={profileMoveHandler}>마이프로필로 이동</Button>}
    </div>
  );
};

export default MainPage;
