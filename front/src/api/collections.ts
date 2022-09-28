import axios from 'axios';
import { ENDPOINT_URL } from '.';

export const Collection = async (page: number, size: number) => {
  const { data } = await axios.get(`${ENDPOINT_URL}/collection`, {params: { page, size }});
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