import axios from "axios";
import { ENDPOINT_URL } from ".";
import { SaleData } from "../layouts/modal/SaleModal";
import { PurchaseData } from "../pages/market/ItemPurchase";

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

export interface NFTdata {
  img_address: string;
  jav_code: string;
  nft_address: string;
  tier: number;
  wallet_address: string;
  token_id: number;
}

export const draw = async (nftData: NFTdata) => {
  const { data } = await axios.post(`${ENDPOINT_URL}/draw`, nftData);
  return data;
};

export interface FusionData {
  img_address: string;
  jav_code: string;
  nft_address: string;
  nft_id_1: number;
  nft_id_2: number;
  tier: number;
  token_id: string;
  wallet_address: string;
}

export const fusionNFT = async (fusionData: FusionData) => {
  const { data } = await axios.post(`${ENDPOINT_URL}/comb`, fusionData);
  return data;
};

export const saleRegister = async (saleData: SaleData) => {
  const { data } = await axios.post(`${ENDPOINT_URL}/market/sale`, saleData);
  return data;
};

export const purchaseRegister = async (purchaseData: PurchaseData) => {
  const { data } = await axios.post(
    `${ENDPOINT_URL}/market/purchase`,
    purchaseData
  );
  return data;
};

export const saleCancel = async (contractAddress: string) => {
  const { data } = await axios.delete(
    `${ENDPOINT_URL}/market/${contractAddress}`
  );
  return data;
};
