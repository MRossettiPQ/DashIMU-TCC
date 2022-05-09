import axios from "axios";

class AuthService {
  async login(user) {
    return await axios
      .post(`${process.env.SERVER_API}/auth/signin`, {
        usernameUser: user.usernameUser,
        senhaUser: user.senhaUser
      })
      .then(response => {
        return response.data;
      });
  }

  async register(user) {
    return await axios.post(`${process.env.SERVER_API}/auth/signup`, {
      usernameUser: user.usernameUser,
      nomeUser: user.nomeUser,
      nascUser: user.nascUser,
      telefoneUser: user.telefoneUser,
      emailUser: user.emailUser,
      senhaUser: user.senhaUser
    });
  }
}

export default new AuthService();
