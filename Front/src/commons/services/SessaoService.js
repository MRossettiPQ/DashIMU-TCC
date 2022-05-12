import axios from 'axios';
import AutorizaHeader from './AutorizaHeader';

class SessaoService {
  async getSessao(id) {
    return await axios.get(`${process.env.SERVER_API}/api/sessao/${id}`, {
      headers: AutorizaHeader()
    });
  }

  async getListaSessao() {
    return await axios.get(`${process.env.SERVER_API}/api/sessao`, {
      headers: AutorizaHeader()
    });
  }

  async postSessao({id, data}) {
    return await axios.post(`${process.env.SERVER_API}/api/sessao/${id}/cadastropaciente`, data, {
      headers: AutorizaHeader()
    });
  }
}

export default new SessaoService();
