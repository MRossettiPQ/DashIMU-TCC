import axios from 'axios';

class AuthService {
  async login(data) {
    return await axios.post(`${process.env.SERVER_API}/api/auth/signin`, data)
      .then(response => {
        return response.data;
      });
  }

  async register(data) {
    return await axios.post(`${process.env.SERVER_API}/api/auth/signup`, data);
  }
}

export default new AuthService();
