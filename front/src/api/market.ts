import axios from "axios";
import { ENDPOINT_URL } from ".";

export const fetchItems = async (
  page: number,
  size: number,
  search: string
) => {
  const { data } = await axios.get(`${ENDPOINT_URL}/market`, {
    params: {
      page: page,
      size: size,
      search: search,
    },
  });
  return data;
};
