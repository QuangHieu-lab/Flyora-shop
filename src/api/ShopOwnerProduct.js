import axios from "axios";

export const getProductOwners = async (authorization) => {
  try {
    const response = await axios.get(
      `https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/owner/products`,
      {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
