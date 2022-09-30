import { Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from '@mui/material/Divider';

import OOZlogo from "../../image/OOZ.png"
import styles from "./CollJavModal.module.scss";

import { Coll } from "./Collections";
import FetchAnimal from "../../utils/FetchAnimal"

interface Props {
  name: string | undefined;
  data: Coll | undefined;
  open: boolean;
  onClose: () => void;
}

// Grid
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const JavModal = ({ name, data, open, onClose }: Props) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "80vh",
    // width: 800,
    bgcolor: "background.paper",
    border: "2px solid #DCDCDC",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    "&:focus": {
      outline: 0,
    },
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        aria-labelledby="modal-modal-title"
        BackdropProps={{
          timeout: 500,
        }}
        // 상세 정보 표시할 경우 넣어준다.
        // aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          {/* <Box sx={style}> */}
          <div className={styles.modalBox}>
            <Typography sx={{fontWeight: "700", fontSize: "1.3rem"}}>
              자브종 정보
            </Typography>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            </Typography> */}
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}
            >
              <Grid style={{display: "flex", justifyContent: "center"}} xs={4} sm={8} md={12} lg={6}>
                <div className={styles.imgContainer}>
                  <img
                    src={data?.jav_img_path}
                    alt="자브종"
                  />
                </div>
              </Grid>
              <Grid style={{display: "flex", alignItems: "center"}} xs={4} sm={8} md={12} lg={6}>
                <div className={styles.modalInfo}>

                  <div className={styles.season}>
                    <div className={styles.title}>season</div>
                    <div className={styles.seasonPJT}>
                      <img className={styles.logoImg} src={OOZlogo} alt="OOZ" />
                      <div>Season 1 - OOZ Project</div>
                    </div>
                  </div>

                  <div className={styles.tokenInfo}>
                    <div>Token ID</div>
                    <div>{data?.jav_id}</div>
                  </div>

                  <div className={styles.tokenInfo}>
                    <div>Contract Address</div>
                    <div>0x8a9ECe9d8806eB0CdE56Ac89cCB23a36E2C718cf</div>
                  </div>

                  {/* <div className={styles.tokenInfo}>
                    <div>Token Standard</div>
                    <div>ERC-721</div>
                  </div> */}

                  <div className={styles.tokenInfo}>
                    <div>BlockChain</div>
                    <div>SSF Network</div>
                  </div>

                  {data &&
                  <div>
                    <div className={styles.divTitle}>body parts</div>
                    <div className={styles.bodyParts}>
                      <div className={styles.partsLabel}>
                        <img className={styles.partsImg} src={require(`../../image/parts/ears/${data?.jav_code[0]}.svg`)} alt="" />
                        <div className={styles.partsDescription}>{FetchAnimal(Number(data?.jav_code[0])).name}</div>
                      </div>
                      <div className={styles.partsLabel}>
                        <img className={styles.partsImg} src={require(`../../image/parts/head/${data?.jav_code[1]}.svg`)} alt="" />
                        <div className={styles.partsDescription}>{FetchAnimal(Number(data?.jav_code[1])).name}</div>
                      </div>
                      <div className={styles.partsLabel}>
                        <img className={styles.partsImg} src={require(`../../image/parts/mouth/${data?.jav_code[2]}.svg`)} alt="" />
                        <div className={styles.partsDescription}>{FetchAnimal(Number(data?.jav_code[2])).name}</div>
                      </div>
                    </div>
                    <div className={styles.marketDiv}>
                      <Link
                        to={`/market?search=${data?.jav_code.slice(0, 3)}0000`}
                        className={styles.marketLink}
                      >
                        마켓으로 가기
                      </Link>
                    </div>
                  </div>}
                </div>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default JavModal;
