import axios from "axios";

export const addNewAccount = async (
  requesterId,
  {
    username,
    password,
    email,
    phone,
    roleId,
    roleName,
    approvedBy,
    name,
    otherInfo,
    shopOwnerId
  }
) => {
  try {
    const response = await axios.post(
      `https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/admin/accounts?requesterId=${requesterId}`,
      {
        username,
        password,
        email,
        phone,
        roleId,
        roleName,
        approvedBy,
        name,
        otherInfo,
        shopOwnerId
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add new account:", error);
    throw error;
  }
};
