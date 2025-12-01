import axios from "axios";
const BASE = "https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/cart";
// const BASE = "http://localhost:8080/api/v1/cart";
//Base là URL gốc của nhóm API -> dễ quản lý, tái sử dụng, và bảo trì code API

// Lấy giỏ hàng
export const getCart = async (items) => {
  const params = new URLSearchParams();
  items.forEach((it) => {
    params.append("productId", it.id);
    params.append("quantity", it.qty);
  });
  const res = await axios.get(`${BASE}?${params.toString()}`);
  return res.data;
};


// Cập nhật số lượng
export const updateQty = async (productId, quantity) => {
  await axios.put(`${BASE}/${productId}`, { quantity });
};

// Xoá sản phẩm
export const deleteItem = async (productId) => {
  await axios.delete(`${BASE}/${productId}`);
};
