import axios from "axios";
import { ENDPOINT_URL } from ".";

export const fetchItems = async (
  page: number,
  size: number,
  search: string,
  haveCompleted: number
) => {
  const { data } = await axios.get(`${ENDPOINT_URL}/market`, {
    params: {
      page: page,
      size: size,
      search: search,
      type: haveCompleted, // 0은 판매중, 1은 전체(판매완료 포함)
    },
  });
  return data;
};

export const fetchItemDetail = async (saleId: string) => {
  const { data } = await axios.get(`${ENDPOINT_URL}/market/${saleId}`);
  return data;
};
