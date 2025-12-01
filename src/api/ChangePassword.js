import axios from "axios";

export const changePassword = async (token, currentPassword, newPassword) => {
  const response = await axios.put(
    "https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/profile/password",
    {
      currentPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
