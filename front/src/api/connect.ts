import axios from 'axios';
import { ENDPOINT_URL } from '.';


export function connectAPI(account: string, balance: string, chain: string) {
  const params = {
    user_account: account,
    user_balance: balance,
    chain: chain,
  };
  axios
  .post(`${ENDPOINT_URL}/connect`, JSON.stringify(params), {
    headers: { 'Content-Type': `application/json` },
  })
  .then((response) => {
    console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  export const getUserInfo = async (account: string | null | undefined) => {
    const { data } = await axios.get(`${ENDPOINT_URL}/user/info/${account}`)
    return data
  }
  
  // 일부러 유저 존재 api는 따로 분리 해놓음 (추후 별도 api 가능성)
  export const checkUser = async (account: string) => {
    const { data } = await axios.get(`${ENDPOINT_URL}/user/info/${account}`)
    return data;
  }

  export const createUser = async (account: string) => {
    const { data } = await axios.post(`${ENDPOINT_URL}/user/login/${account}`) 
    return data
  }

  export interface UserInfo {
    banner_img_path: string | null;
    first_discover_count: number;
    nickname: string | null;
    profile_description: string | null;
    profile_img_path: string | null;
    tier: number;
    token: number;
  }

  // 유저 정보 업데이트
  export const updateUserInfo = async (account: string, option: UserInfo) => {
    const { data } = await axios.put(`${ENDPOINT_URL}/user/info/${account}`, option)
    return data
  }

  // 내 NFT 목록
  export const getMyNFTs = async (account: string | null | undefined, page: number, size: number, sort: number) => {
    const option = {
      params: {
        page: page,
        size: size,
        sort: sort,
      }
    }
    const { data } = await axios.get(`${ENDPOINT_URL}/user/nft/${account}`, option)
    return data
  }

  export const ableCombineNFTs = async (account: string) => {
    const { data } = await axios.get(`${ENDPOINT_URL}/comb/${account}`)
    return data
  }
