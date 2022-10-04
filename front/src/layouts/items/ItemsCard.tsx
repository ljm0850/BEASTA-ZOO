import { Link as RouterLink } from "react-router-dom";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

export interface Product {
  url: string;
  price: number;
  nftId: number;
  javCode: string;
  buyerWallet: string;
  buyerNickname: string;
  sellerWallet: string;
  sellerNickname: string;
  saleId: number;
  saleStartDate: string;
  saleCompleteDate: string;
  contractAddress: string;
  state: number;
  tokenId?: number;
}

const ImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const ItemsCard = ({ product }: { product: Product }) => {
  const { url, price, state, saleId, sellerNickname } = product;
  const symbol = "JAV";

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <ImgStyle src={url} />
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          to={`/market/buy/${saleId}`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Typography
            variant="h6"
            noWrap
            sx={state === 0 ? { color: "blue" } : { color: "red" }}
          >
            {state === 0 ? "판매중" : "판매완료"}
          </Typography>
          <Typography variant="subtitle1" noWrap>
            판매자 : {sellerNickname}
          </Typography>
        </Link>

        <Typography variant="subtitle1" textAlign="right" sx={{ fontSize: 25 }}>
          {price} {symbol}
        </Typography>
      </Stack>
    </Card>
  );
};

export default ItemsCard;
