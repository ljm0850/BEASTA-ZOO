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

  export const getUserInfo = async (account: string | undefined) => {
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

  interface UserInfo {
    banner_img_path: string | null;
    first_discover_count: number;
    nickname: string | null;
    profile_description: string | null;
    profile_img_path: string | null;
    tier: number;
    token: number;
  }

  // https://j7c108.p.ssafy.io:8080/user/info/0x983716873adcf49f5f3f1f82c93f004a3d3aff39
  export const updateUserInfo = async (account: string, option: UserInfo) => {
    const { data } = await axios.put(`${ENDPOINT_URL}/user/info/${account}`, option)
    return data
  }
