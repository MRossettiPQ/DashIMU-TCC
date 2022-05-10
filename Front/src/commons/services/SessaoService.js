import axios from 'axios';
import AutorizaHeader from './AutorizaHeader';

class SessaoService {
  async getSessao(id) {
    return await axios.get(`${process.env.SERVER_API}/api/paciente/${id}`, {
      headers: AutorizaHeader()
    });
  }

  async getListaSessao() {
    return await axios.get(`${process.env.SERVER_API}/api/paciente`, {
      headers: AutorizaHeader()
    });
  }

  async postSessao(id, data) {
    return await axios.post(`${process.env.SERVER_API}/api/paciente/${id}/cadastropaciente`, {
      // headers: AutorizaHeader(),
      nomePaciente: data.nomePaciente,
      nascPaciente: data.nascPaciente,
      telefonePaciente: data.telefonePaciente,
      emailPaciente: data.emailPaciente,
      alturaPaciente: data.alturaPaciente,
      cpfPaciente: data.cpfPaciente,
      idUser: data.idUser
    }, {
      headers: AutorizaHeader()
    });
  }
}

export default new SessaoService();
