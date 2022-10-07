import * as Yup from "yup";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Form, FormikProvider, useFormik, ErrorMessage } from "formik";
import styles from "./SaleModal.module.scss";
import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { createSale } from "../../api/solidity";
import { saleRegister } from "../../api/market";
import SaleRecord from "../graph/SaleRecord";
import Grid from "@mui/material/Unstable_Grid2";
import PartsInfo from "../items/PartsInfo";
import { useNavigate } from "react-router-dom";
import GeneContent from "../../layouts/graph/GeneContent";

interface Props {
  tokenId: number;
  nftId: number;
  open: boolean;
  imgAddr: string;
  onClose: () => void;
  jav_code: string | number | null | undefined;
}

export interface SaleData {
  contract_address: string;
  nft_id: number;
  price: number;
  seller_wallet: string;
}

const SaleModal = ({
  tokenId,
  nftId,
  imgAddr,
  open,
  onClose,
  jav_code,
}: Props) => {
  const symbol = "JAV";
  const [price, setPrice] = useState(0);
  // 타이핑 헬퍼 : 양수만!
  const typeSchema = Yup.object().shape({
    price: Yup.number()
      .positive("양수를 넣어주세요")
      .integer("정수를 넣어주세요")
      .required("수를 넣어주세요")
      .max(100000000, "100000000 JAV 이하의 값을 입력해 주세요"),
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 판매 등록
  const registerHandler = async (price: number) => {
    setLoading(true);
    const data = await createSale(tokenId, price);
    setPrice(price);
    const saleData = await saleRegister({
      contract_address: data.saleAddress,
      nft_id: nftId,
      price: price,
      seller_wallet: data.myAddress,
    });
    navigate(`/market/buy/${saleData.sale_id}`);
    setLoading(false);
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
            <Grid
              // style={{ display: "flex", justifyContent: "center" }}
              container
            >
              <Grid xs={12} lg={5}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img src={imgAddr} alt="" className={styles.cardImg} />
                </div>
              </Grid>
              <Grid lg={1}>
                <div></div>
              </Grid>
              <Grid xs={12} lg={6}>
                <div className={styles.fontStyle}>파츠</div>
                <div
                  className={styles.tokenInfo}
                  style={{
                    // width: "80%",
                    // display: "flex",
                    // justifyContent: "center",
                    margin: "auto",
                  }}
                >
                  <div className={styles.partsInfo}>
                    <PartsInfo javCode={String(jav_code)} />
                  </div>
                </div>
                <br></br>
                <div className={styles.tokenInfo}>
                  <div className={styles.fontStyle}>유전자 비율</div>
                  <div>
                    <GeneContent tokenId={tokenId} />
                  </div>
                </div>
                <br></br>
                {/* <GeneContent tokenId={tokenId} /> */}
                <Stack sx={{ mt: 2 }} />
                <div style={{ display: "flex", justifyContent: "start" }}>
                  <SaleRecord tokenId={tokenId} />
                </div>
                {/* 테스트중 */}
                {/* <Stack sx={{ mt: 2 }} /> */}
              </Grid>
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
                      <Typography variant="inherit" sx={{ pl: 2 }}>
                        {symbol}
                      </Typography>
                    </Stack>
                    {!loading ? (
                      <Button
                        sx={{ ml: 5, width: "50%", fontSize: 15 }}
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        판매
                      </Button>
                    ) : (
                      <Button
                        sx={{ ml: 5, width: "50%", fontSize: 15 }}
                        size="large"
                        type="submit"
                        variant="contained"
                        disabled
                      >
                        판매중
                      </Button>
                    )}
                  </Stack>
                  <ErrorMessage name="price">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </Form>
              </FormikProvider>
              <Grid lg={1}>
                <div></div>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default SaleModal;
