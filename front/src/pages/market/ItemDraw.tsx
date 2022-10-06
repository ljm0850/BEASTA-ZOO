import { Box, Card, Button, Divider } from "@mui/material/";

import CardActions from "@mui/material/CardActions";

import { ReactComponent as Jav } from "../../image/JAV.svg";

import drawImg from "../../image/draw.svg";

import { useState, useEffect } from "react";
import JavModal from "../../layouts/modal/JavModal";
import AlertDialog from "../../layouts/dialog/AlertDialog";

import { myJavToken, pickup } from "../../api/solidity";
import Draw from "../../utils/Draw";
import { NFT } from "../profile/MyJavs";
import AlertModal from "../../layouts/modal/AlertModal";
import styles from "./ItemDraw.module.scss";
import { useNavigate } from "react-router-dom";

const ItemDraw = () => {
  const navigate = useNavigate();
  const [nftData, setNftData] = useState<NFT>();
  const [genes, setGenes] = useState("");

  // 뽑기 모달
  const [openItem, setOpenItem] = useState(false);
  const handleOpenItem = () => setOpenItem(true);
  const handleCloseItem = () => setOpenItem(false);

  // 뽑기 alert or Modal
  // 뽑을 수 없으면 잔액이 부족하다는 modal을 띄운다.
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);

  const handleClickOpenAlert = async () => {
    const balance = await myJavToken();
    if (balance >= 100) {
      setOpenAlert(true);
    } else {
      setOpenAlertModal(true);
    }
  };

  const handleCloseAlert = () => setOpenAlert(false);
  const handleCloseAlertModal = () => setOpenAlertModal(false);

  // 뽑기 구현
  const javPickup = async () => {
    const data = await pickup();
    setNftData(data.nftData);
    setGenes(data.genes);
  };

  useEffect(() => {
    if (sessionStorage.getItem("isLogined") !== "true") {
      alert("로그인 후 이용 가능합니다..");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={drawImg} alt="" />
      <Draw genes={genes} handleOpenItem={handleOpenItem}></Draw>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "30px",
            }}
          >
            <Button
              sx={{
                fontWeight: "bold",
                width: "250px",
                height: "70px",
                fontSize: "x-large",
              }}
              variant="contained"
              size="large"
              color="primary"
              onClick={handleClickOpenAlert}
            >
              뽑기
              <Jav
                style={{
                  width: "1.5rem",
                  height: "auto",
                  marginRight: "0.3rem",
                  marginLeft: "0.8rem",
                }}
              />
              100 JAV
            </Button>
          </div>
        </Box>
      </div>
      <div className={styles.cautionContainer}>
        <Divider />
        <div className={styles.caution}>
          <div>주의 사항!</div>
          <ul>
            <li>
              자브종은 BEASTAZOO에서 뽑기, 조합을 통해 얻을 수 있는 모든
              캐릭터를 의미합니다.
            </li>
            <li>
              뽑기 시 꼭 서명이 필요합니다. 메타마스크 지갑이 자동으로 열리지
              않는 경우는 확장 프로그램을 클릭해주세요.
            </li>
            <li>
              중간에 홈페이지를 끄꺼나 이탈할 경우 자브종은 인벤토리로 들어가지
              않으며, 이때 소모된 JAV, 자브종은 환불되지 않습니다.{" "}
            </li>
            <li>
              해당 뽑기는 1, 2티어 자브종이 출현합니다. 2티어 자브종은 파츠별로
              3% 확률로 뽑힙니다.
            </li>
            <li>
              BEASTAZOO는 시즌제로 운영됩니다. 현재 시즌은 OOZ Project이며 이번
              시즌이 지나면 해당 자브종은 얻을 수 없습니다.
            </li>
          </ul>
        </div>
      </div>
      {/* 뽑기 후 NFT 모달로 보여주기 */}
      <JavModal open={openItem} onClose={handleCloseItem} data={nftData} />
      <AlertDialog
        open={openAlert}
        onClose={handleCloseAlert}
        setAgree={() => {
          setGenes("0000000");
          javPickup();
        }}
        content="뽑으시겠습니까?"
      />
      <AlertModal
        open={openAlertModal}
        onClose={handleCloseAlertModal}
        content={"JAV가 부족합니다."}
      />
    </div>
  );
};

export default ItemDraw;
