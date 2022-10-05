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
        <Grid
          sx={{ mb: 5 }}
          key={product.saleId}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
        >
          <ItemsCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemsList;
