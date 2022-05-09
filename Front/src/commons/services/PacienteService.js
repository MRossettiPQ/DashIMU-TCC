import axios from "axios";
import AutorizaHeader from "./AutorizaHeader";

class PacienteService {

  async getPaciente(id, data) {
    return await axios.get(`${process.env.SERVER_API}/paciente/${id}`, {
      headers: AutorizaHeader()
    });
  }

  async getListaPaciente(data) {
    return await axios.get(`${process.env.SERVER_API}/paciente`, {
      headers: AutorizaHeader()
    });
  }

  async postPaciente({ id, data }) {
    return await axios.post(`${process.env.SERVER_API}/paciente/${id}/cadastropaciente`, data);
  }
}

export default new PacienteService();
