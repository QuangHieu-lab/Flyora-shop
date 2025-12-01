import axios from "axios";

export const getProfile = async (token) => {
  const res = await axios.get("https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};