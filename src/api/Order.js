import axios from "axios";

/**
 * Tạo đơn hàng mới
 * @param {number} customerId
 * @param {Array} items - [{ productId, quantity }]
 * @returns { orderId, status }
 */
export const createOrder = async (customerId, items) => {
  const res = await axios.post("https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/orders", {
    customerId,
    items,
  });

  return res.data;
};