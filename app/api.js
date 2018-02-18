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
  getUsers: (searchStr, token) => {
    return axios({
      method: 'POST',
      url: `${access.baseUrl}/api/protected/users/list`,
      headers: { Authorization: `Bearer ${token}` },
      data: { filter: searchStr },
    }).catch((error) => {
      alert(error.response.data);
    });
  },
  getTransactions: (token) => {
    return axios.get(`${access.baseUrl}/api/protected/transactions`, { headers: { Authorization: `Bearer ${token}` } });
  },
  createTransaction: (name, amount, token) => {
    return axios({
      method: 'POST',
      url: `${access.baseUrl}/api/protected/transactions`,
      headers: { Authorization: `Bearer ${token}` },
      data: { name, amount },
    }).catch((error) => {
      alert(error.response.data);
    });
  },
  getCurrentUserInfo: (token) => {
    return axios.get(`${access.baseUrl}/api/protected/user-info`, { headers: { Authorization: `Bearer ${token}` } });
  },
};
