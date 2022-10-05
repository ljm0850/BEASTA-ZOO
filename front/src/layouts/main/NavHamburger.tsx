import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./DashboardNavbar.module.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  walletDrawer: any;
  account: string;
}

export default function NavHamburger({walletDrawer, account}: Props) {
  const navigate = useNavigate();
  const [state, setState] = React.useState(false);
  const isLogined = sessionStorage.getItem("isLogined");


  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState(open);
    };

  const list = () => (
    <Box
      sx={{ display: "flex", justifyContent: "center", width: "100%"}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List style={{ width: "100%" }}>
        <ListItem
          disablePadding
          onClick={() => {
            navigate(`/market/draw`)
          }}
        >
          <ListItemButton sx={{ display: "flex", justifyContent: "center" }}>
            <ListItemText primary={"뽑기"} sx={{ textAlign: "center" }} />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          onClick={() => {
            navigate(`/market/combine`)
          }}
        >
          <ListItemButton sx={{ display: "flex", justifyContent: "center" }}>
            <ListItemText primary={"조합"} sx={{ textAlign: "center" }} />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          onClick={() => {
            navigate(`/market`);
          }}
        >
          <ListItemButton sx={{ display: "flex", justifyContent: "center" }}>
            <ListItemText primary={"마켓"} sx={{ textAlign: "center" }} />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          onClick={() => {
            navigate(`/market/collections`);
          }}
        >
          <ListItemButton sx={{ display: "flex", justifyContent: "center" }}>
            <ListItemText primary={"도감"} sx={{ textAlign: "center" }} />
          </ListItemButton>
        </ListItem>
        <div>
          {/* 로그인 시 */}
          { isLogined && <div className={styles.connectWallet} onClick={() => {navigate(`/user/${account}`)}}>My Profile</div>}
          {/* 로그인 x */}
          { !isLogined && <div className={styles.connectWallet} onClick={walletDrawer}>Connect Wallet</div>}
        </div>
      </List>
    </Box>
  );

  return (
    <div className={styles.hamburger}>
      <React.Fragment>
        <Button sx={{color: "black"}} onClick={toggleDrawer(true)}>
          <MenuIcon style={{fontSize: "30px"}} />
        </Button>
        <Drawer anchor={"top"} open={state} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
