import * as Yup from "yup";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Form, FormikProvider, useFormik } from "formik";
import styles from "./SaleModal.module.scss";
import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { createSale } from "../../api/solidity";
import { saleRegister } from "../../api/market";

interface Props {
  tokenId: number;
  nftId: number;
  open: boolean;
  imgAddr: string;
  onClose: () => void;
}

export interface SaleData {
  contract_address: string;
  nft_id: number;
  price: number;
  seller_wallet: string;
}

const SaleModal = ({ tokenId, nftId, imgAddr, open, onClose }: Props) => {
  const symbol = "JAV";
  const [price, setPrice] = useState(0);
  // 타이핑 헬퍼 : 양수만!
  const typeSchema = Yup.object().shape({
    price: Yup.number().positive().integer().required(),
  });
  // 입력 데이터 처리
  const formik = useFormik({
    initialValues: {
      price: 0,
    },
    validationSchema: typeSchema,
    onSubmit: (value) => {
      registerHandler(value.price);
    },
  });
  const { errors, touched, handleSubmit, handleReset, getFieldProps } = formik;

  // 판매 등록
  const registerHandler = async (price: number) => {
    const data = await createSale(tokenId, price);
    setPrice(price);
    const x = await saleRegister({
      contract_address: data.saleAddress,
      nft_id: nftId,
      price: price,
      seller_wallet: data.myAddress,
    });
    console.log(x);
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
      >
        <Fade in={open}>
          <div className={styles.saleModal}>
            <Typography sx={{ fontWeight: "700", fontSize: "1.3rem" }}>
              판매하기
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={imgAddr} alt="" />
            </div>
            <Stack sx={{ mt: 7 }} />
            <FormikProvider value={formik}>
              <Form
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
                onReset={handleReset}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-around"
                >
                  <Stack direction="row" alignItems="center">
                    <TextField
                      sx={{ width: "50%" }}
                      type="number"
                      label="판매가격"
                      {...getFieldProps("price")}
                      error={Boolean(touched.price && errors.price)}
                    />
                    <Typography variant="h5" sx={{ pl: 2 }}>
                      {symbol}
                    </Typography>
                  </Stack>
                  <Button
                    sx={{ ml: 5, width: "30%", fontSize: 18 }}
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    판매 등록
                  </Button>
                </Stack>
              </Form>
            </FormikProvider>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default SaleModal;
