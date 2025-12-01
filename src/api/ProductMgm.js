
import axios from "axios";
export const getAllProductsByOwner = async (token) => {
  const res = await axios.get("https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/owner/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("res.data:", res.data);

  return res.data; // Lỗi sẽ xảy ra nếu không có key "products"
};
