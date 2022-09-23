import { useState, useEffect } from "react";
import { getMyNFTs } from "../../api/connect";

// import { experimentalStyled as styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import styles from "./MyJavs.module.scss";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

interface Props {
  account: string | undefined;
}

interface NFT {
  nft_id: number;
  nft_address: string;
  img_address: string;
  user_id: number;
  jav_code: string | number | null;
}

interface NFTs extends Array<NFT> {}

const MyJavs = (props: Props) => {
  const account = props.account;

  const [nfts, setNfts] = useState<NFTs>([]);

  const MyNFTs = () => {
    getMyNFTs(account)
      .then((res) => {
        setNfts(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    MyNFTs();
  }, []);

  return (
    <div>
      <div>소유한 NFT 개수 {nfts.length}</div>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 9, md: 12, lg: 12, xl: 12 }}
      >
        {nfts.map((contact, index) => (
          <Grid item xs={2} sm={3} md={4} lg={3} xl={2} key={index}>
            <div className={styles.javs}>
              <img style={{}} src={contact.nft_address} alt="" />
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyJavs;
