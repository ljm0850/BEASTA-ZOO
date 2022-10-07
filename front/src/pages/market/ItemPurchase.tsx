import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { MotionContainer, varBounceIn } from "../../components/animate";
import { motion } from "framer-motion";
import AlertDialog from "../../layouts/dialog/AlertDialog";
import {
  fetchItemDetail,
  purchaseRegister,
  saleCancel,
} from "../../api/market";
import { Product } from "../../layouts/items/ItemsCard";
import PartsInfo from "../../layouts/items/PartsInfo";
import { cancelSaleNFT, purchaseNFT } from "../../api/solidity";
import { BalanceOfJavToken, getWalletAddress } from "../../common/ABI";
import GeneContent from "../../layouts/graph/GeneContent";
import DateFormatter from "../../utils/DateFormatter";
import styles from "./ItemPurchase.module.scss";

// 이미지 스타일
const ImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain",
  position: "absolute",
  borderRadius: "10px",
  // maxHeight: "536.25px",
  // maxWidth: "536.25px",
});

export interface PurchaseData {
  buyer_wallet_address: string;
  nft_id: number;
  sale_id: number;
}

const ItemPurchase = () => {
  const { saleId } = useParams();
  const [item, setItem] = useState<Product | null>(null);
  const symbol = "JAV";
  const [balance, setBalance] = useState(0);
  const [myWallet, setMyWallet] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 구매 alert
  const [openAlert, setOpenAlert] = useState(false);
  const handleClickOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = () => setOpenAlert(false);

  useEffect(() => {
    getItemDetail();
    getWalletAddress()
      .then((address) => {
        setMyWallet(address);
        BalanceOfJavToken(address).then((money) => {
          setBalance(money);
        });
      })
      .catch((e) => console.log(e));
  }, []);

  const getItemDetail = () => {
    if (saleId) {
      setLoading(true);
      fetchItemDetail(saleId)
        .then((res) => {
          setItem({
            saleId: res.sale_id,
            url: res.img_address,
            nftId: res.nft_id,
            javCode: res.jav_code,
            sellerWallet: res.seller_wallet,
            sellerNickname: res.seller_nickname,
            buyerWallet: res.buyer_wallet,
            buyerNickname: res.buyer_nickname,
            price: res.price,
            saleStartDate: res.sale_start_date,
            saleCompletedDate: res.sale_completed_date,
            contractAddress: res.contract_address,
            state: res.state,
            tokenId: res.token_id,
          });
        })
        .catch((e) => console.log(e));
      setLoading(false);
    }
  };

  const tryPurchase = async () => {
    setLoading(true);
    try {
      await purchaseNFT(item!.contractAddress);
      await purchaseRegister({
        buyer_wallet_address: myWallet,
        nft_id: item!.nftId,
        sale_id: item!.saleId,
      });
      getItemDetail();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const tryCancel = async () => {
    setLoading(true);
    try {
      await cancelSaleNFT(item!.contractAddress);
      await saleCancel(item!.contractAddress);
      getItemDetail();
      navigate(-1);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div>
      {item !== null ? (
        <div style={{ margin: "5vw 5vw 5vw 5vw" }}>
          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} lg={4}>
              <Card className={styles.cardSize} sx={{ boxShadow: "none" }}>
                {/* <Box sx={{ pt: "100%", position: "relative" }}> */}
                <Box
                  className={styles.cardSize}
                  sx={{
                    pt: "100%",
                    position: "relative",
                  }}
                >
                  <ImgStyle src={item.url ? item.url : undefined} />
                </Box>
                <Divider />
              </Card>
            </Grid>
            <Grid item lg={0.5}></Grid>
            <Grid item xs={12} lg={7.5}>
              <div className={styles.boxShadow}>
                <Card>
                  <CardHeader sx={{ ml: 1 }} title="자브종 정보" />
                  <Divider />
                  <CardContent sx={{ ml: 1, mr: 1, pt: 4 }}>
                    <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                      파츠 정보
                    </Typography>
                    <Grid container sx={{ mt: 4 }}>
                      <Grid item xs={12} lg={8}>
                        <PartsInfo javCode={item.javCode} />
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <GeneContent tokenId={item.tokenId!} />
                      </Grid>
                    </Grid>
                    <Divider />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{ mt: 4 }}
                    >
                      <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                        판매자 :
                        <Link
                          underline="none"
                          to={`/user/${item.sellerWallet}`}
                          component={RouterLink}
                        >
                          &nbsp;{item.sellerNickname}
                        </Link>
                      </Typography>
                      <Typography>
                        등록 날짜: {DateFormatter(item.saleStartDate)}
                      </Typography>
                    </Stack>
                    <Divider />
                    {item.state === 1 && (
                      <>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          sx={{ mt: 4 }}
                        >
                          <Typography sx={{ fontSize: 18 }}>
                            구매자 :
                            <Link
                              underline="none"
                              to={`/user/${item.buyerWallet}`}
                              component={RouterLink}
                            >
                              &nbsp;{item.buyerNickname}
                            </Link>
                          </Typography>
                          <Typography>
                            구매 날짜: {DateFormatter(item.saleCompletedDate)}
                          </Typography>
                        </Stack>
                        <Divider />
                      </>
                    )}
                    <Stack direction="row" sx={{ mt: 4 }}>
                      <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                        구매가 :
                      </Typography>
                      <Typography sx={{ ml: 1 }} variant="h6">
                        {item.price} {symbol}
                      </Typography>
                    </Stack>
                    <Divider />

                    {item.state === 0 ? (
                      item.sellerWallet === myWallet ? (
                        <Box sx={{ mt: 5 }}>
                          {!loading ? (
                            <Button
                              fullWidth
                              size="large"
                              variant="contained"
                              sx={{ mb: 3, fontSize: 18 }}
                              onClick={handleClickOpenAlert}
                              color="error"
                            >
                              판매 취소
                            </Button>
                          ) : (
                            <Button
                              fullWidth
                              size="large"
                              variant="contained"
                              sx={{ mb: 3, fontSize: 18 }}
                              disabled
                            >
                              판매 취소
                            </Button>
                          )}
                          <AlertDialog
                            open={openAlert}
                            onClose={handleCloseAlert}
                            setAgree={tryCancel}
                            content="판매취소하겠습니까?"
                          />
                        </Box>
                      ) : (
                        <Box sx={{ mt: 5 }}>
                          {!loading ? (
                            <div>
                              {balance >= item.price ? (
                                <Button
                                  fullWidth
                                  size="large"
                                  variant="contained"
                                  sx={{ mb: 3, fontSize: 18 }}
                                  onClick={handleClickOpenAlert}
                                >
                                  {item.price} {symbol} 에 구매하기
                                </Button>
                              ) : (
                                <Button
                                  fullWidth
                                  size="large"
                                  variant="contained"
                                  sx={{ mb: 3, fontSize: 18 }}
                                  disabled
                                >
                                  잔액이 부족합니다.
                                </Button>
                              )}
                            </div>
                          ) : (
                            <Button
                              fullWidth
                              size="large"
                              variant="contained"
                              sx={{ mb: 3, fontSize: 18 }}
                              disabled
                            >
                              {item.price} {symbol} 에 구매하기
                            </Button>
                          )}

                          <AlertDialog
                            open={openAlert}
                            onClose={handleCloseAlert}
                            setAgree={tryPurchase}
                            content="구매하시겠습니까?"
                          />
                        </Box>
                      )
                    ) : (
                      <Box sx={{ mt: 5 }}>
                        <Button
                          fullWidth
                          size="large"
                          variant="contained"
                          sx={{ mb: 3, fontSize: 18 }}
                          disabled
                        >
                          판매 완료
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <Container>
          <MotionContainer initial="initial" sx={{ mt: 10 }} open>
            <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
              <motion.div variants={varBounceIn}>
                <Typography variant="h3" paragraph>
                  잘못된 요청입니다.
                </Typography>
              </motion.div>
              <Typography sx={{ color: "text.secondary" }}>
                해당 아이템을 찾을 수 없습니다.
              </Typography>

              {/* <motion.div variants={varBounceIn}>
                <Box
                  component="img"
                  src="/static/illustrations/illustration_404.svg"
                  sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
                />
              </motion.div> */}
            </Box>
          </MotionContainer>
        </Container>
      )}
    </div>
  );
};

export default ItemPurchase;
