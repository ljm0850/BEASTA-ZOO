import { Box, Card, Button } from "@mui/material/";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { ReactComponent as Jav } from "../../image/JAV.svg";
import draw1 from "../../image/draw1.gif";
import draw2 from "../../image/draw2.gif";
import { useState } from "react";
import JavModal from "../../layouts/modal/JavModal";
import AlertDialog from "../../layouts/dialog/AlertDialog";

const ItemDraw = () => {
  /**
   * 프로젝트 구현
   * 1. 뽑기 버튼을 눌렀을 경우 경고창 모달과 함께 뽑기를 할 것인지 승인 여부를 묻습니다.
   * 2. 랜덤으로 뽑아진 아이템에 따라 해당 NFT의 대한 정보가 자동으로 입력되며, 등록 승인 (개인키 입력)을 위한 창이 열립니다.
   * 3. 해당 창에서 개인키를 입력하면 getAddressFrom() 함수를 통해 공개키가 반환되며, 공개키가 유효한 경우 해당 아이템 정보가 유지됩니다.
   * 4. 해당 NFT를 IPFS에 업로드합니다.
   * 5. 업로드 완료 후 얻은 정보로 해당 NFT의 메타데이터(Metadata)를 구성하여 IPFS에 업로드합니다.
   * 6. 메타데이터 업로드 완료 후 얻은 정보를 tokenURI로 하여 NFT 생성을 위한 스마트 컨트랙트의 함수를 호출합니다.
   * 7. 정상적으로 트랜잭션이 완결된 후 token Id가 반환됩니다.
   * 8. 백엔드에 token Id와 owner_address를 포함한 정보를 등록 요청합니다.
   */

  // 뽑기 모달
  const [openItem, setOpenItem] = useState(false);
  const handleOpenItem = () => setOpenItem(true);
  const handleCloseItem = () => setOpenItem(false);

  // 뽑기 alert
  const [openAlert, setOpenAlert] = useState(false);
  const handleClickOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = () => setOpenAlert(false);
  const agreeDraw = () => {
    handleOpenItem();
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <img
          src="https://cdn.wip-news.com/news/photo/202204//12620__1509.jpg"
          alt=""
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                1회 뽑기
                <img style={{ width: "250px" }} src={draw1} alt="" />
              </CardContent>
              <CardActions
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  sx={{ fontWeight: "bold" }}
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={handleClickOpenAlert}
                >
                  <Jav
                    style={{
                      width: "1.2rem",
                      height: "auto",
                      marginRight: "0.3rem",
                    }}
                  />
                  100.00 JAV
                </Button>
              </CardActions>
            </Card>

            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                10연속 뽑기
                <img style={{ width: "250px" }} src={draw2} alt="" />
              </CardContent>
              <CardActions
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  sx={{ fontWeight: "bold" }}
                  variant="contained"
                  size="small"
                  color="secondary"
                >
                  <Jav
                    style={{
                      width: "1.2rem",
                      height: "auto",
                      marginRight: "0.3rem",
                    }}
                  />
                  1000.00 JAV
                </Button>
              </CardActions>
            </Card>
          </Box>
        </div>
      </div>

      {/* 뽑기 후 NFT 모달로 보여주기 */}
      <JavModal
        open={openItem}
        onClose={handleCloseItem}
        name="이잼민"
        url="https://mblogthumb-phinf.pstatic.net/MjAyMTA1MTNfMjkz/MDAxNjIwOTEwNDQ3MjQ1.RjpPwu8qenTvn6uEdct9lXaDu6a-eaubruR2i06SjtUg.5izLqsFxNagkeTGMbhf6sGBbNE4adeUKdELQ-H4vozMg.PNG.ysg3355/image.png?type=w800"
      />
      <AlertDialog
        open={openAlert}
        onClose={handleCloseAlert}
        setAgree={agreeDraw}
        content="뽑으시겠습니까?"
      />
    </div>
  );
};

export default ItemDraw;
