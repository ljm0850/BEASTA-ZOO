import mergeImages from 'merge-images';
import * as IPFS from "ipfs-core"
import { draw } from "./market"
import { ethers } from "ethers";
import {
    ABI,
    CreateJavToken,
    getWalletAddress,
    PickUp,
    randomAcce,
    randomGene,
  } from "../common/ABI";
import { CreateSale } from '../contracts';




/* 
Jav Tokken 관련 함수
- 자브토큰 발행(getJavToken)
*/
  // 자브토큰 1000개 발행
  const getJavToken = async () => {
    const address = await getWalletAddress();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(address);
    CreateJavToken(address);
  };



/* 
Jav NFT 관련 함수
- base64 => file 변경 (dataURLtoFile)
- NFT 이미지 생성 (createNFT)
- SC에서 받은 유전자에서 자신의 형질 뽑는 함수(changeGene)
- SC에서 받은 악세에서 이미지 파일에 맞는 숫자를 뽑는 함수(changeAcces)
- 뽑기(pickup)
- 조합(fusionJavs)
*/
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

// NFT 생성, gene는 SC에서 받은 것 그대로, myGenes는 [1,1,1]과 같이 자신의 형질만 분리한 것
const createNFT = async(genes:number[],myGenes:number[],acces:number[], myAcces:number[] ) =>{
    // 이미지 생성
    const address = await getWalletAddress();
    await console.log(myGenes)
    await console.log(myAcces)
    const head = require(`../image/asset/head/${myGenes[0]}.svg`);  // 이미지 주소 확인 필요
    const ears = require(`../image/asset/ears/${myGenes[1]}.svg`);
    const face = require(`../image/asset/face/${myGenes[2]}.svg`);
    const eyes = require(`../image/asset/eyes/${myAcces[0]}.svg`);
    const body = require(`../image/asset/body/${myAcces[1]}.svg`);
    const background = require(`../image/asset/background/${myAcces[2]}.svg`);
    const acc = require(`../image/asset/acc/${myAcces[3]}.svg`);
    const image = await mergeImages([
      { src: background },
      { src: body },
      { src: ears },
      { src: head },
      { src: eyes },
      { src: face },
      { src: acc }
    ]);
    // image를 src에 넣으면 이미지 확인 가능
    const imageFile = await dataURLtoFile(image,"JavNFT")
    // IPFS 등록
    const ipfs = await IPFS.create({ repo: "ok" + Math.random()});
    const added = await ipfs.add(imageFile);
    const url = `https://ipfs.io/ipfs/${added.path}`;
    // NFT 발급
    await console.log(url)
    await PickUp(address,url,genes,acces)
  
    // 백엔드 처리
    // let javCode = ""
    // let tier = 1;
    // await myGenes.forEach((myGene:number,idx:number) => {
    //   tier += parseInt((myGene/3).toString())
    //   javCode += myGene.toString() + ","
    // })
    // await myAcces.forEach((myAcce:number,idx:number) => {
    //   if (idx != 3){
    //     javCode += myAcce.toString() + ","
    //   }
    //   else{
    //     javCode += myAcce.toString()
    //   }
    // })
  }

const changeGene = (genes:string[])=>{
    const myGenes : number[] = [];
    genes.forEach((gene:string,idx:number) => {
        myGenes.push(parseInt(BigInt(gene).toString(16).slice(3,4),16))
    })
    return myGenes
}
const changeAcces = (acces:string[])=>{
    const myAcces : number[] = [];
    acces.forEach((acce:any, idx:number)=>{
        const num = Number(acce).toString(16);
      myAcces.push(parseInt(num.slice(1,3),16));
    })
    return myAcces
}

// 뽑기
export const pickup = async () => {
    // 사전작업
    const genes = await randomGene()
    const acces = await randomAcce();
    const myGenes : number[] = changeGene(genes); // 이미지에서 본인 유전자만 쓰기 위해 사용
    const myAcces : number[] = changeAcces(acces);
    await createNFT(genes,myGenes,acces,myAcces)
}
// 퓨전
export const fusionJavs = async () => {
    // const genes = await FusionJavs()
    const acces = await randomAcce();
    // const myGenes : number[] = changeGene(genes)
    const myAcces : number[] = changeAcces(acces)
    // await createNFT(genes,myGenes,acces,myAcces)
}

/* 
NFT 판매 관련 함수
- 판매 등록 함수(createSale)
- 구메 함수(purchaseNFT)
- 판매 등록 취소 함수(cancelSaleNFT)
*/

export const createSale = async () => {

}

export const purchaseNFT = async () => {

}

export const cancelSaleNFT = async () => {

}