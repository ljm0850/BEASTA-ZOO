import { Fragment, useContext, useEffect, useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, Button, AppBar, Toolbar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
// import Logo from '../../components/Logo';

import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import Login from "../Login";
import profileExample from "../../image/profileExample.jpg";
import Metamask from "../../image/WalletLogo/Metamask_logo.svg";
import Coinbase from "../../image/WalletLogo/Coinbase_logo.svg";
import WalletConnect from "../../image/WalletLogo/WalletConnect_logo.svg";
import Logout from "../Logout";

const actions = [
  { icon: <Logout />, name: "Logout" },
];

// 헤더 화면 (상단 메뉴바)
const DashboardNavbar = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [copy, setCopy] = useState("copy");

  const isLogined = sessionStorage.getItem("isLogined");
  const nickname = sessionStorage.getItem("nickname");
  const profileImgPath = sessionStorage.getItem("profileImgPath");
  const bannerImgPath = sessionStorage.getItem("bannerImgPath");
  const profileDescription = sessionStorage.getItem("profileDescription");

  const copyHandler = () => {
    navigator.clipboard.writeText(account);
    setCopy("copied!");
  };

  // drawer
  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerState(open);
    };

  ///

  const getAccount = async () => {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    setAccount(accounts[0]);
    getBalance(accounts[0]);
  };

  const getBalance = async (account: string) => {
    console.log(account);
    // const response = await SSFTokenContract.methods.balanceOf(account).call();
    // setBalance(response);
  };

  useEffect(() => {
    if (isLogined) {
      getAccount();
    }
  }, []);

  const list = () => (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      // onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <div>
          {profileImgPath ? (
            // <img src={state.profileImgPath} alt="" />
            <Avatar alt="Travis Howard" src={profileExample} />
          ) : (
            <AccountCircleIcon sx={{ fontSize: 35, color: "black" }} />
          )}
          My wallet
        </div>
        <div>
          {account ? (
            <Tooltip title={<div style={{ fontSize: "20px" }}>{copy}</div>}>
              <Button
                onClick={copyHandler}
                onMouseOut={() => {
                  setCopy("copy");
                }}
                onMouseOver={() => {
                  setCopy("copy");
                }}
              >
                {account.toString().slice(0, 6) +
                  "..." +
                  account.toString().slice(38, 42)}
              </Button>
            </Tooltip>
          ) : (
            <></>
          )}
        </div>
      </List>

      <Divider />
      {isLogined === "true" ? (
        <Paper
          variant="outlined"
          sx={{ width: 320, maxWidth: "100%", padding: 0 }}
        >
          <List>
            <ListItem>
              <div>
                <div>Total balance</div>
                <div>{balance}ETH</div>
              </div>
            </ListItem>
          </List>
        </Paper>
      ) : (
        <List>
          <div>아직 지갑이 연결되지 않았습니다.</div>
          <div>MetaMask를 이용하여 지갑을 연결해주세요.</div>
          <Paper
            variant="outlined"
            sx={{ width: 320, maxWidth: "100%", padding: 0 }}
          >
            <List style={{ padding: 0 }}>
              <ListItem style={{ padding: 0 }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <img style={{ width: "25px" }} src={Metamask} alt="" />
                    <div>Metamask</div>
                  </div>
                  <Login />
                </div>
              </ListItem>
              <Divider />
              <ListItem style={{ padding: 0 }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <img style={{ width: "25px" }} src={Coinbase} alt="" />
                    <div>Coinbase Wallet</div>
                  </div>
                  <Button variant="contained" disabled>
                    Login
                  </Button>
                </div>
              </ListItem>
              <Divider />
              <ListItem style={{ padding: 0 }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <img style={{ width: "25px" }} src={WalletConnect} alt="" />
                    <div>WalletConnect</div>
                  </div>
                  <Button variant="contained" disabled>
                    Login
                  </Button>
                </div>
              </ListItem>
            </List>
          </Paper>
        </List>
      )}
    </Box>
  );

  // Nav 스타일링 다시 해야함
  const APPBAR_MOBILE = 64;
  const APPBAR_DESKTOP = 92;

  const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    backgroundColor: alpha(theme.palette.background.default, 0.72),
  }));

  const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up("lg")]: {
      minHeight: APPBAR_DESKTOP,
      padding: theme.spacing(0, 5),
    },
  }));

  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ px: 2.5, py: 3 }}>
          <RouterLink to="/">
            <div>BEASTAZOO</div>
            <div>{account}</div>
          </RouterLink>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 6.5 }}
          sx={{ mr: 10 }}
        >
          {isLogined === "true" ? (
            // <img src={state.profileImgPath} alt="" />
            // <Avatar
            //   alt="Travis Howard"
            //   style={{ cursor: "pointer" }}
            //   sx={{ width: 35, height: 35 }}
            //   src={profileExample}
            // />
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ '& .MuiFab-primary': { width: 35, height: 35 } }}
              icon={
                <Avatar
                  alt="Travis Howard"
                  style={{ cursor: "pointer" }}
                  sx={{ width: 35, height: 35 }}
                  src={profileExample}
                />
              }
              direction="down"
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  tooltipPlacement={"right"}
                  sx={{width: 40, height: 40 }}
                />
              ))}
            </SpeedDial>
          ) : (
            <AccountCircleOutlinedIcon sx={{ fontSize: 35, color: "black" }} />
          )}

          <div>
            <Button onClick={toggleDrawer(true)}>
              <AccountBalanceWalletOutlinedIcon
                sx={{ fontSize: 35, color: "black" }}
              />
            </Button>
            <Drawer
              anchor={"right"}
              open={drawerState}
              onClose={toggleDrawer(false)}
            >
              {list()}
            </Drawer>
          </div>
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default DashboardNavbar;
