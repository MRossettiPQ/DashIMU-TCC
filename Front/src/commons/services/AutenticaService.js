import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "signin", {
        usernameUser: user.usernameUser,
        senhaUser: user.senhaUser
      })
      .then(response => {
        return response.data;
      });
  }

  register(user) {
    return axios.post(API_URL + "signup", {
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
