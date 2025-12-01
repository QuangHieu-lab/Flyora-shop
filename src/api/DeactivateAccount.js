import axios from "axios";

export const deactivateAccount = async (accountId, requesterId) => {
  try {
    const response = await axios.put(
      `https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/admin/accounts/${accountId}/deactivate?requesterId=${requesterId}`,
      {},
      {
        headers: {
          accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deactivating account:", error);
    throw error;
  }
};
