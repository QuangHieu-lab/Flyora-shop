import axios from "axios";

export const deleteAccount = async (id, requesterId) => {
  try {
    const response = await axios.delete(
      `https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/admin/accounts/${id}?requesterId=${requesterId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete account:", error);
    throw error;
  }
};