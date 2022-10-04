import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './FAQ.module.scss';
import Qmark from '../../image/mainPage/Qmark.png';

export default function FAQ() {
  return (
    <div style={{margin: "90px 0 90px 0"}}>
      <p className={styles.FAQTitle}>FAQ</p>
      <Accordion className={styles.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ height: "5rem" }}
          >
          <img src={Qmark} alt="" />
          <Typography sx={{ marginLeft: "1rem", display: "flex", justifyContent: "start", alignItems: "center"}}>NFT란 무엇인가요?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
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
          <Typography sx={{ marginLeft: "1rem", display: "flex", justifyContent: "start", alignItems: "center"}}>JAV NFT는 어떤 블록체인을 사용하나요?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
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
          <Typography sx={{ marginLeft: "1rem", display: "flex", justifyContent: "start", alignItems: "center"}}>JAV NFT는 어떤 프로젝트인가요?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
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
          <Typography sx={{ marginLeft: "1rem", display: "flex", justifyContent: "start", alignItems: "center"}}>JAV는 무엇인가요?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
