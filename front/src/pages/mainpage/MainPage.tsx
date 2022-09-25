import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Login from "../../layouts/Login"
import Draw from "../Draw";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Box sx={{ "& button": { m: 1 } }}>
        <Button onClick={() => {navigate("/market/draw")}} variant="contained" size="large">
          뽑기하러 갑시다
        </Button>
        <Login></Login>
        <Draw />
      </Box>
    </div>
  );
};

export default MainPage;
