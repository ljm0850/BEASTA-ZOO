import mergeImages from "merge-images";
import { ethers } from "ethers";
import {
  ABI,
  CreateJavToken,
  getWalletAddress,
  PickUp,
  randomAcce,
  randomGene,
  getFusionGene,
  FusionJavs,
  CreateSale,
  Purchase,
  CancelSale,
  SetApproveAll,
  GetSaleData,
  GetJavsGene,
  GetJavsAccessory,
  GetJavsCreate_at,
  GetJavsOwner,
  GetJavsURI,
  IsApproved,
  BalanceOfJavToken,
} from "../common/ABI";
import { draw } from "./market";
import { storage } from "../utils/fbase";

/* 
Jav Tokken 관련 함수
- 자브토큰 발행(getJavToken)
*/

// 자브토큰 발행
export const receiveJavToken = async () => {
  const address = await getWalletAddress();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  await signer.signMessage(address);
  await CreateJavToken(address);
};

export const myJavToken = async () => {
  const myAddress = await getWalletAddress();
  const money = await BalanceOfJavToken(myAddress);
  return money;
};

/* 
Jav NFT 관련 함수
- base64 => file 변경 (dataURLtoFile)
- NFT 이미지 생성 (createNFT)
- SC에서 받은 유전자에서 자신의 형질 뽑는 함수(changeGene)
- SC에서 받은 악세에서 이미지 파일에 맞는 숫자를 뽑는 함수(changeAcces)
- 뽑기(pickup)
- 조합(fusion)
*/
function dataURLtoFile(dataurl: string, filename: string) {
  var arr: any = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

// NFT 생성, gene는 SC에서 받은 것 그대로, myGenes는 [1,1,1]과 같이 자신의 형질만 분리한 것
const createNFT = async (myGenes: number[], myAcces: number[]) => {
  // 이미지 생성
  const head = require(`../image/asset/head/${myGenes[0]}.svg`); // 이미지 주소 확인 필요
  const ears = require(`../image/asset/ears/${myGenes[1]}.svg`);
  const face = require(`../image/asset/mouth/${myGenes[2]}.svg`);
  const eyes = require(`../image/asset/eyes/${myAcces[0]}.svg`);
  const body = require(`../image/asset/body/${myAcces[1]}.svg`);
  const background = require(`../image/asset/back/${myAcces[2]}.svg`);
  const acc = require(`../image/asset/acc/${myAcces[3]}.svg`);
  const image = await mergeImages([
    { src: background },
    { src: body },
    { src: ears },
    { src: head },
    { src: eyes },
    { src: face },
    { src: acc },
  ]);

  const imageFile = dataURLtoFile(image, "JavNFT");
  const storageRef = storage.ref("images/test/");
  const imagesRef = storageRef.child(myGenes.join("") + myAcces.join("")); //파일명
  imagesRef.put(imageFile);
  const url = `https://firebasestorage.googleapis.com/v0/b/beastazoo.appspot.com/o/images%2Ftest%2F${
    myGenes.join("") + myAcces.join("")
  }?alt=media`;
  return url;
};

export const changeGene = (genes: number[]) => {
  const myGenes: number[] = [];
  genes.forEach((gene: number) => {
    myGenes.push(Number(BigInt(gene).toString(16).slice(3, 4)));
  });
  return myGenes;
};

const changeAcces = (acces: number[]) => {
  const myAcces: number[] = [];
  acces.forEach((acce: number) => {
    const num = Number(acce).toString(16);
    myAcces.push(parseInt(num.slice(2, 3), 16));
  });
  return myAcces;
};

// 뽑기
export const pickup = async () => {
  // 사전작업
  const address: string = await getWalletAddress();
  const genes = await randomGene();
  const acces = await randomAcce();
  const myGenes: number[] = changeGene(genes); // 이미지에서 본인 유전자만 쓰기 위해 사용
  const myAcces: number[] = changeAcces(acces);
  const url: string = await createNFT(myGenes, myAcces);
  const tokenId: number = await PickUp(address, url, genes, acces);
  let javCode = "";
  let tier = 3;
  myGenes.forEach((myGene: number) => {
    tier += parseInt(((myGene - 1) / 3).toString());
    javCode += myGene.toString(16);
  });
  myAcces.forEach((myAcce: number) => {
    javCode += myAcce.toString(16);
  });
  const nftData = {
    img_address: url,
    jav_code: javCode,
    nft_address: ABI.CONTRACT_ADDRESS.NFT_ADDRESS,
    tier: tier,
    wallet_address: address,
    token_id: tokenId,
  };
  await draw(nftData);
  const genesStr = myGenes.join("");
  return { genes: genesStr, nftData: nftData };
};

// 조합
export const fusion = async (NFT_ID1: number, NFT_ID2: number) => {
  const address = await getWalletAddress();
  const genes = await getFusionGene(NFT_ID1, NFT_ID2);
  const acces = await randomAcce();
  const myGenes: number[] = changeGene(genes);
  const myAcces: number[] = changeAcces(acces);
  const url: string = await createNFT(myGenes, myAcces);
  const tokenId = await FusionJavs(
    address,
    NFT_ID1,
    NFT_ID2,
    url,
    genes,
    acces
  );

  let javCode = "";
  let tier = 3;
  myGenes.forEach((myGene: number) => {
    tier += parseInt((Number(myGene) - 1 / 3).toString());
    javCode += myGene.toString(16);
  });
  myAcces.forEach((myAcce: number) => {
    javCode += myAcce.toString(16);
  });

  // return tokenId;
  return {
    img_address: url,
    jav_code: javCode,
    nft_address: ABI.CONTRACT_ADDRESS.NFT_ADDRESS,
    nft_id_1: NFT_ID1,
    nft_id_2: NFT_ID2,
    tier: tier,
    token_id: tokenId,
    wallet_address: address,
  };
};

interface JavDATA {
  genes: string[];
  acces: string[];
  created_at: string;
  URI: string;
  owner: string;
}

// NFT 조회
export const javsData = async (NFT_ID: number) => {
  const data: JavDATA = {
    genes: await GetJavsGene(NFT_ID),
    acces: await GetJavsAccessory(NFT_ID),
    created_at: await GetJavsCreate_at(NFT_ID),
    owner: await GetJavsOwner(NFT_ID),
    URI: await GetJavsURI(NFT_ID),
  };

  return data;
};
export const javsGeneContent = async (NFT_ID: number) => {
  const weight = [1, 1, 1, 1, 8, 8, 80]; //solidity JAV_NFT의 weight에서 따옴
  const ratio = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 해당 동물의 index에 weight만큼 추가됨
  const data = await GetJavsGene(NFT_ID);
  data.forEach((gene: string) => {
    const num = BigInt(gene).toString(16);
    let idx = 0;
    while (idx < 7) {
      const temp = num.slice(3 * idx + 1, 3 * idx + 4);
      const i = Number(temp) - 1;
      ratio[i] += weight[6 - idx] / 3;
      idx += 1;
    }
  });
  for (let i = 0; i < ratio.length; i++) {
    ratio[i] = Math.round(ratio[i] * 100) / 100;
  }

  return ratio;
};

/* 
NFT 판매 관련 함수
- 판매 등록 함수(createSale)  // saleAddress 주소 반환
- 구메 함수(purchaseNFT)  // 구매한 토큰 아이디 반환
- 판매 등록 취소 함수(cancelSaleNFT)
*/

export const createSale = async (tokenId: number, price: number) => {
  const myAddress: string = await getWalletAddress();
  const approve = await isApprove(myAddress);
  if (!approve) {
    await approveSale();
  }
  const saleAddress: string = await CreateSale(myAddress, tokenId, price);
  const data = { myAddress: myAddress, saleAddress: saleAddress };
  return data;
};

export const purchaseNFT = async (saleAddress: string) => {
  const address = await getWalletAddress();
  const purchaseTokenId = await Purchase(address, saleAddress);
  return purchaseTokenId;
};
// SC 좀 수정해야함
export const cancelSaleNFT = async (saleAddress: string) => {
  await CancelSale(saleAddress);
};

export const saleRecord = async (tokenId: number) => {
  const numRecords: number[] = [];
  const strRecords: string[] = await GetSaleData(tokenId);
  strRecords.forEach((record) => {
    numRecords.push(Number(record) / 1000);
  });
  return numRecords;
};

/*
유저 당 한번은 해야 하는 함수
*/
export const approveSale = async () => {
  const myAddress: string = await getWalletAddress();
  SetApproveAll(myAddress);
};

// 인증되어있으면 True 아니면 False
export const isApprove = async (userAddress: string) => {
  const data: boolean = await IsApproved(userAddress);
  return data;
};

// 테스트중
