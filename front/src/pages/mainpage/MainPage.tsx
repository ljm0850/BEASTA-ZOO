import { Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Login from "../../layouts/Login"
// import Draw from "../Draw";
import { useEffect, useState } from "react";


import RecentlyCollections from "../../layouts/main/RecentlyCollections";
import Marketplace from "../../layouts/main/Marketplace";
import CollectorRanking from "../../layouts/main/CollectorRanking";
import SeasonCarousel from "../../layouts/main/SeasonCarousel";
import FAQ from "../../layouts/main/FAQ";

import banner from "../../image/mainPage/banner.png";
import guide from "../../image/mainPage/guide.png";

const MainPage = () => {
  const userNickname = sessionStorage.getItem('nickname');
  console.log(userNickname);

  const navigate = useNavigate();

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
    <div>
      <Box>
        <p>Welcome, {userNickname}</p>
        <img src={banner} alt="banner" />
        <Button
        onClick={() => {
          navigate("/market/draw");
        }}
        variant="contained"
        size="large">
          Draw
        </Button>
        <img src={guide} alt="banner" />
        <RecentlyCollections />
        <Marketplace />
        <CollectorRanking />
      </Box>
      <SeasonCarousel />
      <FAQ />
      <Login></Login>
      { sessionStorage.getItem("isLogined") && <Button variant="contained" onClick={profileMoveHandler}>마이프로필로 이동</Button>}
    </div>
  );
};

export default MainPage;
