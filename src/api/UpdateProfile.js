// src/api/UpdateProfile.js
import axios from "axios";

export const updateProfile = async (token, data) => {
  const response = await axios.put("https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/profile", data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
