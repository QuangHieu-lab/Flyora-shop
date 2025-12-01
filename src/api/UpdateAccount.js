import axios from "axios";

export const updateAccount = async (
  id,
  requesterId,
  {
    username,
    password,
    email,
    phone,
    isActive,
    isApproved,
    roleId,
    roleName,
    approvedBy,
    name,
    otherInfo,
    shopOwnerId
  }
) => {
  try {
    const response = await axios.put(
      `https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/admin/accounts/${id}?requesterId=${requesterId}`,
      {
        username,
        password,
        email,
        phone,
        isActive,
        isApproved,
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
    console.error("Failed to update account:", error);
    throw error;
  }
};



