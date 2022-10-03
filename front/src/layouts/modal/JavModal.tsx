import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";

import OOZlogo from "../../image/OOZ.png";
import styles from "./JavModal.module.scss";

import { NFT } from "../../pages/profile/MyJavs";

import GeneContent from "../../layouts/graph/GeneContent"
interface Props {
  data: NFT | undefined;
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

const JavModal = ({ data, open, onClose }: Props) => {
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
            <Typography sx={{ fontWeight: "700", fontSize: "1.3rem" }}>
              자브종 정보
            </Typography>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            </Typography> */}
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}
            >
              <Grid
                style={{ display: "flex", justifyContent: "center" }}
                xs={4}
                sm={8}
                md={12}
                lg={6}
              >
                <div className={styles.imgContainer}>
                  <img src={data?.img_address} alt="자브종" />
                </div>
              </Grid>
              <Grid
                style={{ display: "flex", alignItems: "center" }}
                xs={4}
                sm={8}
                md={12}
                lg={6}
              >
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
                    <div>{data?.token_id}</div>
                  </div>

                  <div className={styles.tokenInfo}>
                    <div>Contract Address</div>
                    <div>{data?.nft_address}</div>
                  </div>

                  <div className={styles.tokenInfo}>
                    <div>Token Standard</div>
                    <div>ERC-721</div>
                  </div>

                  <div className={styles.tokenInfo}>
                    <div>BlockChain</div>
                    <div>SSF Network</div>
                  </div>

                  <div className={styles.tokenInfo}>
                    <div>Gene code</div>
                    <div>{data?.jav_code}</div>
                  </div>
                  <div className={styles.tokenInfo}>
                    <div>Gene Content</div>
                    <GeneContent tokenId={Number(data?.token_id)}/>
                  </div>
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
