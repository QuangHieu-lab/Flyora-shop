// src/api/ShippingFee.js
import axios from "axios";

const BASE = "https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1";

export const ShippingFee = async (requesterId, data) => {
  const res = await axios.post(
    `${BASE}/shipping-utils/calculate-fee?requesterId=${requesterId}`,
    data
  );
  return res.data;
};
