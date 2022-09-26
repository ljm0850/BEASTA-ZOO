import { Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Login from "../../layouts/Login"
import Draw from "../Draw";
import { useEffect, useState } from "react";


const MainPage = () => {
  const navigate = useNavigate();

  // 임시 프로필 이동 버튼 
  const [ account, setAccount ] = useState("")
  
  const getAccount = async () => {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    setAccount(accounts[0]);
  };

  useEffect(() => {
    getAccount()
  }, [])

  const profileMoveHandler = () => {
    navigate(`user/${account}`)
  }


  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ "& button": { m: 1 } }}>
        <Button
          onClick={() => {
            navigate("/market");
          }}
          variant="contained"
          size="large"
        >
          마켓으로 갑시다
        </Button>
        <Button
          onClick={() => {
            navigate("/market/draw");
          }}
          variant="contained"
          size="large"
        >
          뽑기하러 갑시다
        </Button>
        <Login></Login>
        <Draw />
        { sessionStorage.getItem("isLogined") && <Button variant="contained" onClick={profileMoveHandler}>마이프로필로 이동</Button>}
      </Box>
    </div>
  );
};

export default MainPage;
