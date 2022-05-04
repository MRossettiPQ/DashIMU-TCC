import axios from "axios";
import AutorizaHeader from "./AutorizaHeader";

class PacienteService {
  API_URL = `http://localhost:8000/api`;

  getSensores(id, data) {
    return axios.get(`${this.API_URL}/sensores/lista`, {
      headers: AutorizaHeader()
    });
  }
}

export default new PacienteService();
