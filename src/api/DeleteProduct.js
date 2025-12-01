import axios from "axios";

export const deleteProduct = async (authorization, id) => {
  try {
    const response = await axios.delete(
      `https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/owner/products/${id}`,
      {
        headers: {
          Authorization: authorization,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error;
  }
};