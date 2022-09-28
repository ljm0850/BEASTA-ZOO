import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OOZ_logo from '../../image/collections/OOZ_logo.png';
import styles from './SeasonAccordian.module.scss';

// static files
import cat from "../../image/mainPage/cat.png"
import rooster from "../../image/mainPage/rooster.png"
import deer from "../../image/mainPage/deer.png"
import dragon from "../../image/mainPage/dragon.png"
import hawk from "../../image/mainPage/hawk.png"
import pig from "../../image/mainPage/pig.png"
import rabbit from "../../image/mainPage/rabbit.png"
import sheep from "../../image/mainPage/sheep.png"
import tiger from "../../image/mainPage/tiger.png"

const SeasonAccordian = () => {
  const jav = [rooster, rabbit, deer, sheep, dragon, hawk, cat, pig, tiger]
  const javName = ['Rooster', 'Rabbit', 'Deer', 'Sheep', 'Dragon', 'Bird', 'Cat', 'Boar', 'Tiger']

  return (
    <div>
      <Accordion sx={{ width: "90%" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ height: "5rem" }}
          >
          <img src={OOZ_logo} alt="" />
          <Typography sx={{ marginLeft: "1rem", display: "flex", justifyContent: "start", alignItems: "center"}}>Season 1 - OOZ Project</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            {jav.map((item, idx) => {
              return (
                <div>
                  <img className={styles.JAV} src={item} alt="" />
                  <p className={styles.JAVName}>{javName[idx]}</p>
                </div>
              );
            })}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default SeasonAccordian;