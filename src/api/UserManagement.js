import axios from "axios";

export const UserAccounts = async (requesterId) => {
  try {
    const response = await axios.get(
      `https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/admin/accounts?requesterId=${requesterId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed:", error);
    throw error;
  }
}