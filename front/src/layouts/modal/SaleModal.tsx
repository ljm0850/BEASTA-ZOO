import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

import styles from "./SaleModal.module.scss";


interface Props {
  jav: string | undefined;
  open: boolean;
  imgAddr: string | undefined;
  onClose: () => void;
}

const SaleModal = ({ jav, imgAddr, open, onClose }: Props) => {

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
      >
        <Fade in={open}>
          <div className={styles.saleModal}>
            <Typography sx={{fontWeight: "700", fontSize: "1.3rem"}}>
              판매하기
            </Typography>
              <div>{jav}</div>
            <div style={{display: "flex", justifyContent:"center"}}>
              <img src={imgAddr} alt="" />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default SaleModal;
