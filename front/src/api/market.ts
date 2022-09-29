import axios from "axios";
import { ENDPOINT_URL } from ".";
import mergeImages from 'merge-images';
import * as IPFS from "ipfs-core"
import {
  ABI,
  getWalletAddress,
  PickUp,
  randomAcce,
  randomGene,
} from "../common/ABI";

export const fetchItems = async (
  page: number,
  size: number,
  search: string,
  haveCompleted: number,
  sort: number
) => {
  const { data } = await axios.get(`${ENDPOINT_URL}/market`, {
    params: {
      page: page,
      size: size,
      search: search, // 파츠별 조회
      type: haveCompleted, // 0은 판매중, 1은 전체(판매완료 포함)
      sort: sort,
    },
  });
  return data;
};

export const fetchItemDetail = async (saleId: string) => {
  const { data } = await axios.get(`${ENDPOINT_URL}/market/${saleId}`);
  return data;
};

export const draw = async (
  img_address: string, jav_code: string,
  nft_address: string, tier: number,
  wallet_address : string
  ) => {
    const data = {
      img_address: img_address,
      jav_code: jav_code,
      nft_address:nft_address,
      tier: tier,
      wallet_address: wallet_address
    }
    console.log(data)
    axios.post(`${ENDPOINT_URL}/draw}`,JSON.stringify(data))
  }