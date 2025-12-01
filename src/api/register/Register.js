import axios from 'axios';

export const RegisterAPI = async (username, email, password, phone, name) => {
  try {
    const res = await axios.post('https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/auth/register', {
      username,
      password,
      email,
      phone,
      name,
    });

    return res.data;
  } catch (error) {
    // In lỗi chi tiết
    if (error.response) {
      console.error('Lỗi từ API:', error.response.data);
      return error.response.data;
    } else {
      console.error('Lỗi không phản hồi:', error.message);
      return { error: error.message };
    }
  }
};
