import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Product } from "../../layouts/items/ItemsCard";
import ItemsList from "../../layouts/items/ItemsList";

const Items = () => {
  const resultItem = {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQRasieESJNiRFefqktJL4qkTQhbeLt-nrJQ&usqp=CAU",
    price: 500,
    nftId: 1,
    buyerWallet: "1232131",
    saleId: 1,
    saleStartDate: "123",
    saleCompleteDate: "123",
    contractAddress: "주소",
    sellerId: 1,
  };

  const [item, setItem] = useState<Product[]>([]);
  const [isCollection, setIsCollection] = useState(false);
  const [loading, setLoading] = useState(false);
  /**
   * 프로젝트 구현
   * 1. 구매하기 클릭 시 해당 자브종을 조회하기 위해 API를 호출합니다.
   * 2. 응답으로부터 받은 token id로 Sale(판매) 정보를 요청합니다.
   * 3. sale 컨트랙트 주소로 즉시 구매가를 컨트랙트로부터 직접 조회합니다.
   * 4. token id로 NFT 컨트랙트로부터 직접 tokenURI를 조회하여 화면에 표시합니다.
   */

  const getItem = async () => {
    // TODO
    setLoading(true);
    const resultList = [];
    resultList.push(resultItem);

    setItem(resultList);
    setLoading(false);
    setIsCollection(true);
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div>
      {loading === false ? (
        <>
          {isCollection === true ? (
            <Container maxWidth="xl">
              <ItemsList products={item} />
            </Container>
          ) : (
            <Container>
              <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
                <Typography variant="h3" paragraph>
                  검색 결과 없음
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  판매되고 있는 아이템이 없습니다.
                </Typography>
                {/* <Box
                  component="img"
                  src="/static/illustrations/illustration_register.png"
                  sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
                /> */}
              </Box>
            </Container>
          )}
        </>
      ) : (
        <Container>
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <Typography variant="h3" paragraph>
              아이템 로딩중...
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              판매되고 있는 아이템을 검색하고 있습니다.
            </Typography>
            <Box
              component="img"
              src="/static/illustrations/illustration_register.png"
              sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
            />
          </Box>
        </Container>
      )}
    </div>
  );
};

export default Items;
