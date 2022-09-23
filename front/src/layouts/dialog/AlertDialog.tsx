import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  title: string | undefined;
  content: string | undefined;
  open: boolean;
  agreeName: string | undefined;
  disagreeName: string | undefined;
  onClose: () => void;
  setAgree: () => void;
}

const AlertDialog = (props: Props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>{props.disagreeName}</Button>
          <Button
            onClick={() => {
              props.onClose();
              props.setAgree();
            }}
            autoFocus
          >
            {props.agreeName}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AlertDialog.defaultProps = {
  title: "알림",
  agreeName: "네",
  disagreeName: "아니오",
};

export default AlertDialog;
