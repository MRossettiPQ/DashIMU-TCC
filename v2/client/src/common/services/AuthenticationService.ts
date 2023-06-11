import { Axios } from '../utils/AxiosUtils';
import { LoginVo, RegisterVo } from 'src/common/models/User';

class AuthenticationService {
  async login(bean: LoginVo) {
    const { data } = await Axios.post('/api/auth/login', bean);
    return data?.content;
  }

  async register(bean: RegisterVo) {
    const { data } = await Axios.post('/api/auth/register', bean);
    return data?.content;
  }

  async context() {
    const { data } = await Axios.get('/api/auth/context');
    return data?.content;
  }
}

export default new AuthenticationService();
