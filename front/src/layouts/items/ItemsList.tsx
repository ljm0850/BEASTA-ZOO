import { Grid } from "@mui/material";
import ItemsCard, { Product } from "./ItemsCard";

const ItemsList = (products: Product[], { ...other }) => {
  return (
    <Grid container spacing={6} {...other}>
      {products.map((product) => (
        <Grid sx={{ mb: 5 }} key={product.saleId} item xs={12} sm={6} md={3}>
          <ItemsCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemsList;
