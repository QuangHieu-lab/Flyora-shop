import axios from "axios";

/**
 * Tạo thanh toán mới (COD hoặc VNPay)
 * @param {Object} paymentData - Gồm: orderId, customerId, paymentMethodId, amount (nếu VNPay)
 * @returns Trả về link thanh toán (vnpay) hoặc paymentId (COD)
 */
// src/api/payments.js
const BASE = "https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1";

export const createPayment = async (paymentData) => {
  const res = await axios.post(`${BASE}/payments`, paymentData);
  return res.data;
};

