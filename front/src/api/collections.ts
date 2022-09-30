import axios from 'axios';
import { ENDPOINT_URL } from '.';

export const Collection = async (page: number, size: number, type: number, wallet_address: string) => {
  const { data } = await axios.get(`${ENDPOINT_URL}/collection`, {params: { page, size, type, wallet_address }});
  return data
}

export const recentCollection = async (size: number) => {
  const { data } = await axios.get(`${ENDPOINT_URL}/collection/latest`, {params: { size }});
  return data
}

export const userRank = async () => {
  const { data } = await axios.get(`${ENDPOINT_URL}/community/rank`);
  return data
}

export const myCollCount = async (wallet_address :string) => {
  const { data } = await axios.get(`${ENDPOINT_URL}/user/rank/${wallet_address}`);
  return data
}

export const totalCount = async () => {
  const { data } = await axios.get(`${ENDPOINT_URL}/collection/totalCount`);
  return data
}