import { Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import styles from "./MainPage.module.scss";

import RecentlyCollections from "../../layouts/main/RecentlyCollections";
import Marketplace from "../../layouts/main/Marketplace";
import CollectorRanking from "../../layouts/main/CollectorRanking";
import SeasonCarousel from "../../layouts/main/SeasonCarousel";
import FAQ from "../../layouts/main/FAQ";

import bannerImg from "../../image/mainPage/bannerImg.png";
import NFT_logo from "../../image/mainPage/NFT_logo.png";

const MainPage = () => {
  const navigate = useNavigate();

  const userNickname = sessionStorage.getItem("nickname");

  return (
    <div className={styles.mainBody}>
      <Box sx={{ width: "75%", margin: "80px 12.5% 3% 12.5%" }}>
        {sessionStorage.getItem("isLogined") && (
          <p className={styles.welcome}>Welcome, {userNickname}</p>
        )}
        <div
          className={styles.mainBanner}
          onClick={() => {
            navigate("/market/draw");
          }}
        >
          <div className={styles.banner}>
            <div className={styles.title}>
              <div>BEASTAZOO의</div>
              <div>첫번째 프로젝트</div>
              <div>22.10.07 - 22.12.07</div>
            </div>

            <div className={styles.subTitle}>
              <div>NFT Project OOZ - Season 1</div>
              <div>October 7th, 2022</div>
              <div className={styles.draw}>
                <div>뽑기</div>
              </div>
            </div>
          </div>
          <div>
            <img src={bannerImg} alt="" />
          </div>
        </div>

        <RecentlyCollections />
        <Marketplace />

        <div className={styles.guide}>
          <div className={styles.title}>
            <div className={styles.subTitle}>
              NFT 이용 가이드를 먼저 보고, 손쉽게 서비스를 이용해보세요.
            </div>
            <div>
              <div className={styles.subBtn1}>
                <div>지갑 만들기부터, 마켓플레이스 이용까지, NFT 시작하기 →</div>
              </div>
              <div className={styles.subBtn2}>
                <div>NFT 시작하기 →</div>
              </div>
            </div>
          </div>
          <div>
            <img className={styles.nftLogo} src={NFT_logo} alt="" />
          </div>
        </div>
        
        <CollectorRanking />
        <SeasonCarousel />
        <FAQ />
      </Box>
    </div>
  );
};

export default MainPage;
