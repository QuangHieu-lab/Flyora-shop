// src/api/UserActivityLog.js
import axios from "axios";
export const getUserActivityLogs = async (requesterId) => {
  try {
    const response = await axios.get(
      `https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/admin/accounts/logs?requesterId=${requesterId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed:", error);
    throw error;
  }
};