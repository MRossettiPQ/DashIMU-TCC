import {Axios} from '../utils/AxiosUtils';

class AuthService {
  async login(bean) {
    const { data } = await Axios.post(`/api/auth/login`, bean);
    console.log(data)
    return data?.content
  }

  async register(bean) {
    const { data } = await Axios.post(`/api/auth/register`, bean);
    console.log(data)
    return data?.content
  }
}

export default new AuthService();
