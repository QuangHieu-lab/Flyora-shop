import axios from "axios";
const BASE = "https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api";

export const createPayOSLink = async (orderId) => {
  const res = await axios.post(`${BASE}/payos/create-link/${orderId}`);
  return res.data;
};
