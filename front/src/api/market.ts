import axios from "axios";
import { ENDPOINT_URL } from ".";

export const fetchItems = async () => {
  const { data } = await axios.get(`${ENDPOINT_URL}/market`);
  return data;
};
