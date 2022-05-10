import axios from 'axios';

class AuthService {
  async login(user) {
    return await axios
      .post(`${process.env.SERVER_API}/api/auth/signin`, {
        usernameUser: user.usernameUser,
        senhaUser: user.senhaUser
      })
      .then(response => {
        return response.data;
      });
  }

  async register(data) {
    return await axios.post(`${process.env.SERVER_API}/api/auth/signup`, data);
  }
}

export default new AuthService();
