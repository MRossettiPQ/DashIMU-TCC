import axios from 'axios';
import {Axios} from '../utils/AxiosUtils';

class SessaoService {
  async getSessao(id) {
    const request = await Axios.get(`/api/sessao/${id}`);
    return request?.data
  }

  async getListaSessao() {
    const request = await Axios.get(`/api/sessao`);
    return request?.data
  }

  async postSessao({id, data}) {
    const request = await Axios.post(`/api/sessao/${id}/cadastropaciente`, data);
    return request?.data
  }
}

export default new SessaoService();
