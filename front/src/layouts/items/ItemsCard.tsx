import { Link as RouterLink } from "react-router-dom";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

export interface Product {
  url: string | undefined;
  price: number | 0;
  nftId: number | undefined;
  buyerWallet: string | undefined;
  saleId: number | 0;
  saleStartDate: string;
  saleCompleteDate: string;
  contractAddress: string;
  sellerId: number | 0;
}

const ImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain",
  position: "absolute",
});

const ItemsCard = ({ product }: { product: Product }) => {
  const {
    url,
    price,
    nftId,
    buyerWallet,
    saleId,
    saleStartDate,
    saleCompleteDate,
    contractAddress,
    sellerId,
  } = product;
  const symbol = "JAV";

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <ImgStyle src={url} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          to={`/items/buy/${saleId}`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Typography variant="subtitle1" noWrap>
            {nftId}
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
