import { Box, Fade, Modal, Typography } from "@mui/material";
import { ReactComponent as Jav } from "../../image/JAV.svg";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  content: string;
  open: boolean;
  onClose: () => void;
}

const AlertModal = ({ content, open, onClose }: Props) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        aria-labelledby="modal-modal-title"
        BackdropProps={{
          timeout: 500,
        }}
        // 상세 정보 표시할 경우 넣어준다.
        // aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box sx={style}>
            <Jav
              style={{
                width: "1.2rem",
                height: "auto",
                marginRight: "0.3rem",
                marginLeft: "0.8rem",
              }}
            />
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ display: "inline" }}
            >
              {content}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AlertModal;
