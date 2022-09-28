import axios from 'axios';
import { ENDPOINT_URL } from '.';

export const recentCollection = async (size: number) => {
  const { data } = await axios.get(`${ENDPOINT_URL}/collection/latest/`, {params: { size }});
  return data
}

export const userRank = async () => {
  const { data } = await axios.get(`${ENDPOINT_URL}/community/rank`);
  return data
}