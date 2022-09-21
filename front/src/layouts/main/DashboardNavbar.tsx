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
import { AppContext } from "../../utils/Context";

// 헤더 화면 (상단 메뉴바)
const DashboardNavbar = () => {
  const { state, actions } = useContext(AppContext)

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

    // useEffect(() => {
    //   actions.retainConnect()
    // }, [])

  const list = () => (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <div>
          {state.account ? <img src={state.profileImgPath} alt="" /> : 
          <AccountCircleIcon sx={{ fontSize: 35, color: "black" }} />}
          My wallet
        </div>
          <div>{state.account ? state.account: <></>}</div>
      </List>

      <Divider />

      <List>
        <div>아직 지갑이 연결되지 않았습니다.</div>
        <div>MetaMask를 이용하여 지갑을 연결해주세요.</div>
        <Paper
          variant="outlined"
          sx={{ width: 320, maxWidth: "100%", padding: 0 }}
        >
          <List style={{ padding: 0 }}>
            <ListItem style={{ padding: 0 }}>
                <div style={{ width: '100%', height: "100%", display: 'flex', justifyContent: 'space-around'}}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>Metamask</div>
                  <Button variant="contained" onClick={actions.handleConnect}>연결하기</Button>
                </div>
            </ListItem>
            <Divider />
            <ListItem style={{ padding: 0 }}>
                <div style={{ width: '100%', height: "100%", display: 'flex', justifyContent: 'space-around'}}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>Metamask</div>
                  <Button variant="contained">연결하기</Button>
                </div>
            </ListItem>
            <Divider />
            <ListItem style={{ padding: 0 }}>
                <div style={{ width: '100%', height: "100%", display: 'flex', justifyContent: 'space-around'}}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>Metamask</div>
                  <Button variant="contained">연결하기</Button>
                </div>
            </ListItem>
          </List>
        </Paper>
      </List>
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
            <div>{state.account}</div>
          </RouterLink>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 6.5 }}
          sx={{ mr: 10 }}
        >
          <AccountCircleOutlinedIcon sx={{ fontSize: 35, color: "black" }} />

          <div>
            <Button onClick={toggleDrawer(true)}>
              <AccountBalanceWalletOutlinedIcon
                sx={{ fontSize: 35, color: "black" }}
              />
            </Button>
            <Drawer anchor={"right"} open={drawerState} onClose={toggleDrawer(false)}>
              {list()}
            </Drawer>
          </div>
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default DashboardNavbar;
