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
