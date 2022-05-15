import {Axios} from '../utils/AxiosUtils';

class AuthService {
  async login(data) {
    const request = await Axios.post(`${process.env.SERVER_API}/api/auth/signin`, data);
    return request?.data
  }

  async register(data) {
    const request = await Axios.post(`api/auth/signup`, data);
    return request?.data
  }
}

export default new AuthService();
