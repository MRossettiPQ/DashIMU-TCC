import axios from "axios";
import AutorizaHeader from "./AutorizaHeader";

class SessaoService {
  async getSessao(id, data) {
    return await axios.get(`${process.env.SERVER_API}/paciente/${id}`, {
      headers: AutorizaHeader()
    });
  }

  async getListaSessao(data) {
    return await axios.get(`${process.env.SERVER_API}/paciente`, {
      headers: AutorizaHeader()
    });
  }

  async postSessao(id, data) {
    return await axios.post(`${process.env.SERVER_API}/paciente/${id}/cadastropaciente`, {
      // headers: AutorizaHeader(),
      nomePaciente: data.nomePaciente,
      nascPaciente: data.nascPaciente,
      telefonePaciente: data.telefonePaciente,
      emailPaciente: data.emailPaciente,
      alturaPaciente: data.alturaPaciente,
      cpfPaciente: data.cpfPaciente,
      idUser: data.idUser
    });
  }
}

export default new SessaoService();
