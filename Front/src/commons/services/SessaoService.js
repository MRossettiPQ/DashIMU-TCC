import axios from 'axios';
import {Axios} from '../utils/AxiosUtils';

class SessaoService {
  async getSessao(id) {
    const request = await Axios.get(`/api/session/${id}`);
    return request?.data
  }

  async getListaSessao() {
    const request = await Axios.get(`/api/session`);
    return request?.data
  }

  async postSessao({id, data}) {
    const request = await Axios.post(`/api/session/${id}/cadastropaciente`, data);
    return request?.data
  }
}

export default new SessaoService();
