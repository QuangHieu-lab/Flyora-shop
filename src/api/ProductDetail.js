import axios from "axios";
export const getProductDetail = async (id) => {
  try {
    const response = await axios.get(
      `https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/products/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
}