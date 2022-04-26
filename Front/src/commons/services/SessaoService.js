import axios from "axios";
import AutorizaHeader from "./AutorizaHeader";

class SessaoService {
  API_URL = `http://localhost:8000/api`;

  getSessao(id, data) {
    return axios.get(`${this.API_URL}/paciente/${id}`, {
      headers: AutorizaHeader()
    });
  }

  getListaSessao(data) {
    return axios.get(`${this.API_URL}/paciente`, {
      headers: AutorizaHeader()
    });
  }

  postSessao(id, data) {
    return axios.post(`${this.API_URL}/paciente/${id}/cadastropaciente`, {
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
