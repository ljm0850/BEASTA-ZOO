import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./FAQ.module.scss";
import Qmark from "../../image/mainPage/Qmark.png";

export default function FAQ() {
  return (
    <div style={{ margin: "90px 0 90px 0" }}>
      <p className={styles.FAQTitle}>FAQ</p>
      <Accordion className={styles.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ height: "5rem" }}
        >
          <img src={Qmark} alt="" />
          <Typography
            sx={{
              marginLeft: "1rem",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              fontWeight: "700",
            }}
          >
            NFT란 무엇인가요?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          NFT란 대체불가 토큰(Non-Fungible Token)의 약자로 디지털 형태를 갖춘 암호화 자산입니다. 대체 가능한 비트코인과 달리 각 NFT 토큰은 고유합니다.
          NFT는 암호화된 거래내역을 블록체인에 영구적으로 남김으로써 고유성을 보장받습니다. 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={styles.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{ height: "5rem" }}
        >
          <img src={Qmark} alt="" />
          <Typography
            sx={{
              marginLeft: "1rem",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              fontWeight: "700",
            }}
          >
            BEASTAZOO는 어떤 블록체인을 사용하나요?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            BEASTAZOO는 현재 SSAFY Network를 통해 서비스를 제공하고 있습니다.
            메인넷을 포함해 JAV 토큰에 가치를 부여하는 것이 향후 로드맵에 포함되어 있습니다.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={styles.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{ height: "5rem" }}
        >
          <img src={Qmark} alt="" />
          <Typography
            sx={{
              marginLeft: "1rem",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              fontWeight: "700",
            }}
          >
            BEASTAZOO는 어떤 프로젝트인가요?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            동물 캐릭터들을 조합하여 나만의 자브종 NFT를 만드는 프로젝트입니다! 3가지 파츠와 4개의 악세사리로 구성되어
            1,200만개에 달하는 외형을 보유합니다. 지금 바로 나만의 자브종 NFT를 만들어보세요!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
