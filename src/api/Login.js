import axios from 'axios';

export const LoginAPI = async (username, password) => {

  console.log(username, password);
  const res = await axios.post('https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/auth/login', {
    username,
    password
  });

  return res;
};

