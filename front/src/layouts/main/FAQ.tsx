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
            <br />
            <div>
              NFT란 대체불가 토큰(Non-Fungible Token)의 약자로 디지털 형태를
              갖춘 암호화 자산입니다.
            </div>
            <br />
            <div>대체 가능한 비트코인과 달리 각 NFT 토큰은 고유합니다.</div>
            <br />
            <div>
              NFT는 암호화된 거래내역을 블록체인에 영구적으로 남김으로써
              고유성을 보장합니다.
            </div>
            <br />
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
            <br />
            <div>
              ERC-721으로 작성한 이더리움 기반 SSF 네트워크 내에서 배포된
              스마트컨트랙트로 만들어진 NFT입니다.
            </div>
            <br />
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
            <br />
            <div>
              BEASTAZOO 팀 프로젝트는 뽑기와 조합을 통해 귀여운 자브종 NFT
              캐릭터를 얻는 프로젝트입니다.
            </div>
            <br />
            <div>
              총 9개의 귀여운 동물 친구로 1,2,3티어로 나뉘어 있고 BEASTAZOO의
              자체 유전 알고리즘을 통해 1티어에서 3티어까지의 자브종을 얻을 수
              있습니다.
            </div>
            <br />
            <div>
              같은 동물일지라도 다양한 악세사리와 옷, 배경을 뽑아 자신만의
              자브종을 만들어 볼 수 있습니다.
            </div>
            <br />
            <div>
              지금 바로 나만의 자브종 NFT를 만들어보세요!
            </div>
            <br />
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
            JAV는 무엇인가요?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <br />
            <div>
              JAV는 JAV종을 뽑기 위한 "BEASTAZOO"만의 디지털 화폐 단위입니다.
            </div>
            <br />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
