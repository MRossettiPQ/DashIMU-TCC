import axios from "axios";
import AutorizaHeader from "./AutorizaHeader";

class PacienteService {
  API_URL = `http://localhost:8000/api`;

  getPaciente(id, data) {
    return axios.get(`${this.API_URL}/paciente/${id}`, {
      headers: AutorizaHeader()
    });
  }

  getListaPaciente(data) {
    return axios.get(`${this.API_URL}/paciente`, {
      headers: AutorizaHeader()
    });
  }

  postPaciente({ id, data }) {
    console.log(data);
    return axios.post(`${this.API_URL}/paciente/${id}/cadastropaciente`, data);
  }
}

export default new PacienteService();
