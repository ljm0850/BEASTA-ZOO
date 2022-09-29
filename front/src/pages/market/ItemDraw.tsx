import { Box, Card, Button } from "@mui/material/";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { ReactComponent as Jav } from "../../image/JAV.svg";
import draw1 from "../../image/draw1.gif";
import draw2 from "../../image/draw2.gif";
import { useState } from "react";
import JavModal from "../../layouts/modal/JavModal";
import AlertDialog from "../../layouts/dialog/AlertDialog";
import _ from "lodash";
// 백엔드
import { draw } from "../../api/market";
// SC import
import {
  ABI,
  web3,
  JAV_NFT_Contract,
  JavToken_Contract,
  CreateJavToken,
  BalanceOfJavToken,
  getWalletAddress,
  PickUp,
  randomAcce,
  randomGene,
  FusionJavs,
  CreateSale
  
} from "../../common/ABI";
// 이미지 처리
import mergeImages from 'merge-images';
import * as IPFS from "ipfs-core"
// 테스트
import { ethers } from "ethers";
import { number } from "yup/lib/locale";

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


  const [b64, setB64] = useState(""); 
  function mergeImage(genes: number[], acces: number[]) {
    const head = require(`../../image/asset/head/${genes[0]}.svg`);
    const ears = require(`../../image/asset/ears/${genes[1]}.svg`);
    const face = require(`../../image/asset/face/${genes[2]}.svg`);
    const eyes = require(`../../image/asset/eyes/${acces[0]}.svg`);
    const body = require(`../../image/asset/body/${acces[1]}.svg`);
    const background = require(`../../image/asset/background/${acces[2]}.svg`);
    const acc = require(`../../image/asset/acc/${acces[3]}.svg`);
    mergeImages([
      { src: background },
      { src: body },
      { src: ears },
      { src: head },
      { src: eyes },
      { src: face },
      { src: acc }
    ]).then((res:any) => { setB64(res)})
  }

  const imagePushIPFS = async (image:any)=>{
    const ipfs = await IPFS.create({ repo: "ok" + Math.random()});
    const added = await ipfs.add(image);
    const url = `https://ipfs.io/ipfs/${added.path}`;
    console.log(url)
    return url
  }
  // base64 -> 파일 변경
  function dataURLtoFile(dataurl:string, filename:string) {
    var arr :any = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}
  
  // 자브토큰 1000개 발행
  const getJavToken = async () => {
    const address = await getWalletAddress();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(address);
    CreateJavToken(address);
  };

  // 뽑기 함수
  const [test,setTest] = useState("")
  const pickup = async () => {
    // SC
    const address = await getWalletAddress();
    const genes = await randomGene()
    const acces = await randomAcce();
    const myGenes :number[] = []; // 이미지에서 본인 유전자만 쓰기 위해 사용
    const myAcces : number[] = [];
    
    await genes.forEach((gene:string,idx:number) => {
      myGenes.push(parseInt(BigInt(gene).toString(16).slice(3,4),16))
    })
    await acces.forEach((acce:any, idx:number)=>{
      const num = Number(acce).toString(16);
      myAcces.push(parseInt(num.slice(1,3),16));
    })
    await mergeImage(myGenes,myAcces)
    const imageFile = await dataURLtoFile(b64,"JavNFT")
    const NFT_URI = await imagePushIPFS(imageFile)
    await PickUp(address,NFT_URI,genes,acces)

    // 백엔드
    let javCode = ""
    await myGenes.forEach((myGene:number,idx:number) => {
      javCode += myGene.toString() + ","
    })
    await myAcces.forEach((myAcce:number,idx:number) => {
      if (idx != 3){
        javCode += myAcce.toString() + ","
      }
      else{
        javCode += myAcce.toString()
      }
    })
    let tier;

    // await draw(NFT_URI, javCode, ABI.CONTRACT_ADDRESS.NFT_ADDRESS,)





  };
  
  //조합 함수
  const fusionjavs = async () => {
    const address = await getWalletAddress();
    const targetNFT1 = 1; //조합할 NFT의 tokenID 백에서 받아와 선언해야함
    const targetNFT2 = 2; //조합할 NFT의 tokenID 백에서 받아와 선언해야함

    await FusionJavs(address,targetNFT1, targetNFT2);
  }
  const payDraw = async () => {
    const accounts = await web3.eth.getAccounts();
    // const drawContract = new web3.eth.Contract(drawABI, drawAddress);
    const nonce = await web3.eth.getTransactionCount(accounts[0]);
  };

  let NFTSaleAddress = "";
  //판매함수
  const createsale = async () => {
    const address = await getWalletAddress();

    const targetNFT = 3; //판매할 NFT의 tokenID 백에서 받아와 선언
    const price = 100; //판매할 가격

    const saleAddress = await CreateSale(address, targetNFT, price);
    console.log(saleAddress);
    
    //판매Contract 주소 반환
    NFTSaleAddress = saleAddress;
    return saleAddress;
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
          <button onClick={getJavToken}> 10000 JavToken 받기</button>
          <button onClick={pickup}> JAV NFT 발급</button>
          <button onClick={fusionjavs}> JAV NFT 조합하기</button>
          <button onClick={createsale}> JAV NFT 판매하기</button>
          <button onClick={createsale}> JAV NFT 구매하기</button>
          <img src={b64} alt="" />
          <img src={test}/>
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
          </Box>
        </div>
      </div>

      {/* 뽑기 후 NFT 모달로 보여주기 */}
      <JavModal
        open={openItem}
        onClose={handleCloseItem}
        name="이잼민"
        data={{
          count: 0,
          nft_id: 123,
          nft_address: "https://mblogthumb-phinf.pstatic.net/MjAyMTA1MTNfMjkz/MDAxNjIwOTEwNDQ3MjQ1.RjpPwu8qenTvn6uEdct9lXaDu6a-eaubruR2i06SjtUg.5izLqsFxNagkeTGMbhf6sGBbNE4adeUKdELQ-H4vozMg.PNG.ysg3355/image.png?type=w800",
          img_address: "string",
          user_id: 123,
          jav_code: 1231,
          total_page: 3,
        }} />
      <AlertDialog
        open={openAlert}
        onClose={handleCloseAlert}
        setAgree={handleOpenItem}
        content="뽑으시겠습니까?"
      />
    </div>
  );
};

export default ItemDraw;
