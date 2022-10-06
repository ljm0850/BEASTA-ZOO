import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import styles from './Footer.module.scss'
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.footerContainer}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{background:"#F8F8F8", height: "65px"}}
        >
          <div className={styles.footerName}>
            <div>BEASTAZOO</div>
            <div>SSAFY 7th C108 | 특화 프로젝트 | 디지털화폐</div>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{background: "#F8F8F8"}}>
          <div className={styles.footerDetail}>
            <div className={styles.sub1}>
              <div className={styles.title}>BEASTAZOO</div>
              <div className={styles.list}>
                <div onClick={() => {navigate('market/draw')}}>뽑기</div>
                <div onClick={() => {navigate('market/combine')}}>조합</div>
                <div onClick={() => {navigate('market')}}>마켓</div>
                <div onClick={() => {navigate('collections')}}>도감</div>
              </div>
            </div>

            <div className={styles.sub2}>
              <div className={styles.container}>
                <div className={styles.title}>만든 이들</div>
                <a href="https://github.com/kimsezin" target="_blank" rel="noreferrer" >김세진 <OpenInNewIcon/></a>
                <a href="https://github.com/ammajoe" target="_blank" rel="noreferrer" >김지호 <OpenInNewIcon/></a>
                <a href="https://github.com/ljm0850" target="_blank" rel="noreferrer" >이재민 <OpenInNewIcon/></a>
                <a href="https://github.com/yunhlim" target="_blank" rel="noreferrer" >임윤혁 <OpenInNewIcon/></a>
                <a href="https://github.com/cih831" target="_blank" rel="noreferrer" >최인호 <OpenInNewIcon/></a>
                <a href="https://github.com/dasiscore" target="_blank" rel="noreferrer" >허재영 <OpenInNewIcon/></a>
              </div>
            </div>

          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Footer;
