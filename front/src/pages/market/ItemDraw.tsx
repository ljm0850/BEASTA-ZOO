import { Box, Card, Button } from "@mui/material/";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { ReactComponent as Jav } from "../../image/JAV.svg";

import drawImg from "../../image/draw.svg";

import { useState } from "react";
import JavModal from "../../layouts/modal/JavModal";
import AlertDialog from "../../layouts/dialog/AlertDialog";
import _ from "lodash";
// 뽑기함수
import { draw } from "../../api/market";
import { pickup } from "../../api/solidity";
import Draw from "../../utils/Draw";
import { NFT } from "../profile/MyJavs";

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

  const [nftData, setNftData] = useState<NFT>();
  const [genes, setGenes] = useState("");

  // 뽑기 구현
  const javPickup = async () => {
    const data = await pickup();
    setNftData(data.nftData);
    setGenes(data.genes);
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
        <img src={drawImg} alt="" />
        <Draw genes={genes} handleOpenItem={handleOpenItem}></Draw>
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
                  1회 뽑기
                  <Jav
                    style={{
                      width: "1.2rem",
                      height: "auto",
                      marginRight: "0.3rem",
                      marginLeft: "0.8rem",
                    }}
                  />
                  100 JAV
                </Button>
              </CardActions>
            </Card>
          </Box>
        </div>
      </div>

      {/* 뽑기 후 NFT 모달로 보여주기 */}
      <JavModal open={openItem} onClose={handleCloseItem} data={nftData} />
      <AlertDialog
        open={openAlert}
        onClose={handleCloseAlert}
        setAgree={javPickup}
        content="뽑으시겠습니까?"
      />
    </div>
  );
};

export default ItemDraw;
