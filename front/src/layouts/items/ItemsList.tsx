import { Grid } from "@mui/material";
import ItemsCard, { Product } from "./ItemsCard";

interface Props {
  products: Product[];
  [x: string]: any;
}

const ItemsList = ({ products, ...others }: Props) => {
  return (
    <Grid container spacing={6} {...others}>
      {products.map((product) => (
        <Grid sx={{}} key={product.saleId} item xs={12} sm={6} md={6} lg={4} xl={3}>
          <ItemsCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemsList;
