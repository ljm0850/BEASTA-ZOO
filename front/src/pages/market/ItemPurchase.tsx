import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Link,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import Web3 from "web3";
import { MotionContainer, varBounceIn } from "../../components/animate";
import { motion } from "framer-motion";
import AlertDialog from "../../layouts/dialog/AlertDialog";
import { fetchItemDetail } from "../../api/market";
import { Product } from "../../layouts/items/ItemsCard";
import PartsInfo from "../../layouts/items/PartsInfo";

// 이미지 스타일
const ImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain",
  position: "absolute",
});

const ItemPurchase = () => {
  /**
   * 프로젝트 구현작품 조회
   * 1. sale Id로 작품의 상세 정보를 조회합니다.
   *    작품의 tokenURI를 NFT로부터 직접 조회합니다.
   *
   * 거래 진행
   *  1. Sale 컨트랙트가 구매자의 JAV 토큰을 상대방에게 전송할 수 있는 권한을 부여합니다.
   *  2. 정상 호출 후, Sale 컨트랙트의 purchase() 함수를 호출합니다.
   *  3. 정상 호출 후 buyer 정보를 백엔드에 업데이트합니다.
   */
  const { saleId } = useParams();

  // [변수] 아이템, 판매자, 판매자 주소, 심볼, 가격,
  //       판매자 잔액, 컬렉션 유무, 처리 완료 여부, 현재 시간, 판매 종료 시간, 판매중 여부
  const [item, setItem] = useState<Product | null>(null);
  const [seller, setSeller] = useState("");
  const [sellerAdr, setSellerAdr] = useState("");
  const [contract, setContract] = useState("");
  const symbol = "JAV";
  const [price, setPrice] = useState("0");
  const [balance, setBalance] = useState("0");
  const [isComplete, setIsComplete] = useState(false);

  let moment = require("moment");
  const currentTime = parseInt((moment() / 1000).toFixed(0));

  // [변수] 구매 모달 (모달, 지갑 주소, 개인키, 로딩)
  const [purchaseModal, setPurchaseModal] = useState(false);
  const [address, setAddress] = useState("");
  const [privKey, setPrivKey] = useState("");
  const [loading, setLoading] = useState(false);

  // 뽑기 alert
  const [openAlert, setOpenAlert] = useState(false);
  const handleClickOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = () => setOpenAlert(false);

  // Web3
  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL!)
  );

  /**
   * [초기 데이터 설정]
   * 화면 첫 렌더링시 판매되고 있는 작품 상세 정보를 조회합니다.
   */
  useEffect(() => {
    getItemDetail();
  }, []);

  // 모달 핸들링 (즉시 구매)
  const toggleModal = () => {
    setAddress("");
    setBalance("0");
    setPrivKey("");
    setPurchaseModal(!purchaseModal);
  };

  /**
   * PJT Ⅱ - 과제 2: 작품 조회
   * Req. 2-F3 작품 상세 조회
   *
   * token id로 작품의 상세 정보를 조회합니다.
   * 작품의 tokenURI를 NFT로부터 직접 조회합니다.
   *
   * PJT Ⅲ - 과제 2: 작품 판매 등록
   * Req. 2-F3 작품 상세 화면 수정
   *
   * 작품의 판매 등록 여부에 따라 sale 컨트랙트를 호출할 수 있는 버튼
   * (제안하기, 구매하기)이 추가되어야 합니다.
   *
   */
  const getItemDetail = async () => {
    if (saleId) {
      fetchItemDetail(saleId).then((res: any) => {
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
        });
      });
    }
  };

  /**
   * PJT Ⅲ - 과제 3: 거래 진행
   * Req. 3-F1 제안하기
   *
   * 1. bid 컨트랙트 함수 호출 파라메터를 지정합니다.
   * 2. Sale 컨트랙트가 구매자의 SSAFY 토큰을 상대방에게 전송할 수 있는 권한을 부여합니다. (approveERC20Token() 호출)
   * 2. 정상 호출 후, Sale 컨트랙트의 purchase() 함수를 호출합니다.
   */
  const tryBid = () => {
    // TODO
    setLoading(false);
  };

  /**
   * PJT Ⅲ - 과제 3: 거래 진행
   * Req. 3-F2 구매하기
   *
   * 1. Sale 컨트랙트가 구매자의 SSAFY 토큰을 상대방에게 전송할 수 있는 권한을 부여합니다.
   * 2. 정상 호출 후, Sale 컨트랙트의 purchase() 함수를 호출합니다.
   * 3. 정상 호출 후 buyer 정보를 백엔드에 업데이트합니다.
   */
  const tryPurchase = async () => {
    // TODO
    setLoading(false);
  };

  return (
    <div>
      {item !== null ? (
        <>
          <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
            <Stack width="25%">
              <Card>
                <Box sx={{ pt: "100%", position: "relative" }}>
                  <ImgStyle src={item.url ? item.url : undefined} />
                </Box>
                <Divider />
              </Card>
            </Stack>

            <Stack sx={{ ml: 10 }} width="50%">
              <Card>
                <CardHeader sx={{ ml: 1, mb: 2 }} title="자브종 정보" />
                <Divider />
                <CardContent sx={{ ml: 1, mr: 1, pt: 4 }}>
                  <Stack direction="row" sx={{ mt: 4 }}>
                    <PartsInfo javCode={item.javCode} />
                  </Stack>
                  <Divider />
                  <Stack direction="row" sx={{ mt: 4 }}>
                    <Typography sx={{ fontSize: 18 }}>소유자 : </Typography>
                    <Typography sx={{ ml: 1, mr: 2 }} variant="h6">
                      {sellerAdr}
                    </Typography>
                    {sellerAdr.length !== 0 ? (
                      <Link
                        underline="none"
                        to={`/user/${sellerAdr}`}
                        component={RouterLink}
                      >
                        (콜렉션 보기)
                      </Link>
                    ) : null}
                  </Stack>
                  {isComplete === false ? (
                    <>
                      <Divider />
                      <Stack direction="row" sx={{ mt: 4 }}>
                        <Typography sx={{ fontSize: 18 }}>구매가 : </Typography>
                        <Typography sx={{ ml: 1 }} variant="h6">
                          {price} {symbol}
                        </Typography>
                      </Stack>
                      <Divider />
                    </>
                  ) : null}

                  {/*
                   * PJT Ⅲ - 과제 3: 거래 진행
                   * 판매 중인 상태인 경우 거래를 위한 버튼을 추가합니다.
                   *
                   * Req. 3-F1 제안하기
                   * Req. 3-F2 구매하기
                   */}
                  {isComplete === false ? (
                    <>
                      <Box sx={{ mt: 5 }}>
                        <Button
                          fullWidth
                          size="large"
                          variant="contained"
                          sx={{ mb: 3, fontSize: 18 }}
                          onClick={toggleModal}
                        >
                          {price} {symbol} 에 구매하기
                        </Button>

                        <AlertDialog
                          open={openAlert}
                          onClose={handleCloseAlert}
                          setAgree={tryBid}
                          content="구매하시겠습니까?"
                        />
                      </Box>
                    </>
                  ) : null}
                </CardContent>
              </Card>
            </Stack>
          </Stack>
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
