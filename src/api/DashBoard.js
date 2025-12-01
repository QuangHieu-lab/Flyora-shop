import axios from "axios";

export const getDashboardData = async (authorization) => {
  try {
    const response = await axios.get(
      `https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/owner/dashboard/products/top-sales`,
      {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    throw error;
  }
};
