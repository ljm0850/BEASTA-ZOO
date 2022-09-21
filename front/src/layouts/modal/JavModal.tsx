import { Box, Modal, Typography } from "@mui/material";

interface Props {
  name: string | undefined;
  url: string | undefined;
  open: boolean;
  onClose: () => void;
}

const JavModal = ({ name, url, open, onClose }: Props) => {
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

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        // 상세 정보 표시할 경우 넣어준다.
        // aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {name}
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>

          </Typography> */}
          <img
            style={{
              width: "25rem",
              height: "auto",
            }}
            src={url}
          ></img>
        </Box>
      </Modal>
    </div>
  );
};

JavModal.defaultProps = {
  name: "에러",
};

export default JavModal;
