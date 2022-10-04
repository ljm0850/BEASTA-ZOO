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
import { Link as RouterLink, useParams } from "react-router-dom";
import { MotionContainer, varBounceIn } from "../../components/animate";
import { motion } from "framer-motion";
import AlertDialog from "../../layouts/dialog/AlertDialog";
import { fetchItemDetail, purchaseRegister } from "../../api/market";
import { Product } from "../../layouts/items/ItemsCard";
import PartsInfo from "../../layouts/items/PartsInfo";
import { purchaseNFT } from "../../api/solidity";
import { BalanceOfJavToken, getWalletAddress } from "../../common/ABI";
import GeneContent from "../../layouts/graph/GeneContent";

// 이미지 스타일
const ImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain",
  position: "absolute",
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
  let moment = require("moment");
  const currentTime = parseInt((moment() / 1000).toFixed(0));

  const [loading, setLoading] = useState(false);

  // 구매 alert
  const [openAlert, setOpenAlert] = useState(false);
  const handleClickOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = () => setOpenAlert(false);

  useEffect(() => {
    getItemDetail();
    getWalletAddress().then((address) => {
      setMyWallet(address);
      BalanceOfJavToken(address).then((money) => {
        setBalance(money);
      });
    });
  }, []);

  const getItemDetail = async () => {
    if (saleId) {
      setLoading(true);
      await fetchItemDetail(saleId).then((res: any) => {
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
          saleCompleteDate: res.sale_complete_date,
          contractAddress: res.contract_address,
          state: res.state,
          tokenId: res.token_id,
        });
      });
      setLoading(false);
    }
  };

  const tryPurchase = async () => {
    setLoading(true);
    await purchaseNFT(item!.contractAddress);
    await purchaseRegister({
      buyer_wallet_address: myWallet,
      nft_id: item!.nftId,
      sale_id: item!.saleId,
    });
    await getItemDetail();
    setLoading(false);
  };

  return (
    <div>
      {item !== null ? (
        <>
          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} sm={5} md={3}>
              <Card>
                <Box sx={{ pt: "100%", position: "relative" }}>
                  <ImgStyle src={item.url ? item.url : undefined} />
                </Box>
                <Divider />
              </Card>
            </Grid>

            <Grid item xs={12} sm={7} md={9}>
              <Card>
                <CardHeader sx={{ ml: 1 }} title="자브종 정보" />
                <Divider />
                <CardContent sx={{ ml: 1, mr: 1, pt: 4 }}>
                  <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                    파츠 정보
                  </Typography>
                  <Grid container sx={{ mt: 4 }}>
                    <Grid item xs={12} md={8}>
                      <PartsInfo javCode={item.javCode} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <GeneContent tokenId={item.tokenId!} />
                    </Grid>
                  </Grid>
                  <Divider />
                  <Stack direction="row" sx={{ mt: 4 }}>
                    <Typography sx={{ fontSize: 18 }}>
                      판매자 :
                      <Link
                        underline="none"
                        to={`/user/${item.sellerWallet}`}
                        component={RouterLink}
                      >
                        &nbsp;{item.sellerNickname}
                      </Link>
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction="row" sx={{ mt: 4 }}>
                    <Typography sx={{ fontSize: 18 }}>구매가 :</Typography>
                    <Typography sx={{ ml: 1 }} variant="h6">
                      {item.price} {symbol}
                    </Typography>
                  </Stack>
                  <Divider />

                  {/*
                   * PJT Ⅲ - 과제 3: 거래 진행
                   * 판매 중인 상태인 경우 거래를 위한 버튼을 추가합니다.
                   *
                   * Req. 3-F1 제안하기
                   * Req. 3-F2 구매하기
                   */}
                  {item.state === 0 ? (
                    <>
                      <Box sx={{ mt: 5 }}>
                        <Button
                          fullWidth
                          size="large"
                          variant="contained"
                          sx={{ mb: 3, fontSize: 18 }}
                          onClick={handleClickOpenAlert}
                        >
                          {item.price} {symbol} 에 구매하기
                        </Button>

                        <AlertDialog
                          open={openAlert}
                          onClose={handleCloseAlert}
                          setAgree={tryPurchase}
                          content="구매하시겠습니까?"
                        />
                      </Box>
                    </>
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
            </Grid>
          </Grid>
        </>
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
