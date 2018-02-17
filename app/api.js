import axios from 'axios';
import access from './config/access';

export default {
  createAccount: (data) => {
    return axios.post(`${access.baseUrl}/users`, {
      username: data.name,
      password: data.password,
      email: data.email,
    }).catch((error) => {
      alert(error.response.data);
    });
  },
  logIn: (data) => {
    return axios.post(`${access.baseUrl}/sessions/create`, {
      email: data.email,
      password: data.password,
    })
      .catch((error) => {
        alert(error.response.data);
      });
  },
  getCurrentUserInfo: () => {
    const token = localStorage.getItem('credential') || null;
    return axios.get(`${access.baseUrl}/api/protected/user-info`, { headers: { Authorization: `Bearer ${token}` } })
      .catch((error) => {
        alert(error.response.data);
      });
  },
};
