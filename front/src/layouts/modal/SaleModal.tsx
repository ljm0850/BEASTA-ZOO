import * as Yup from "yup";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Form, FormikProvider, useFormik } from "formik";
import styles from "./SaleModal.module.scss";
import { useState } from "react";
import { TextField } from "@mui/material";

interface Props {
  tokenId: string | undefined;
  open: boolean;
  imgAddr: string | undefined;
  onClose: () => void;
}

const SaleModal = ({ tokenId, imgAddr, open, onClose }: Props) => {
  const [price, setPrice] = useState(0);
  // 타이핑 헬퍼
  const typeSchema = Yup.object().shape({
    cost: Yup.string().required("판매 금액을 입력해주세요."),
  });
  // 입력 데이터 처리
  const formik = useFormik({
    initialValues: {
      price: 0,
    },
    validationSchema: typeSchema,
    onSubmit: (value) => {
      setPrice(value.price);
    },
  });
  const { errors, touched, handleSubmit, handleReset, getFieldProps } = formik;

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
            <Typography sx={{ fontWeight: "700", fontSize: "1.3rem" }}>
              판매하기
            </Typography>
            <div>{tokenId}</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={imgAddr} alt="" />
            </div>
            <FormikProvider value={formik}>
              <Form
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
                onReset={handleReset}
              >
                <TextField
                  sx={{ width: "100%" }}
                  type="number"
                  label="판매가격"
                  {...getFieldProps("price")}
                  error={Boolean(touched.price && errors.price)}
                />
              </Form>
            </FormikProvider>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default SaleModal;
