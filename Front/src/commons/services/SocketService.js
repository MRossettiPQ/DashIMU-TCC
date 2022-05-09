import axios from "axios";
import AutorizaHeader from "./AutorizaHeader";

class PacienteService {
  async getSensores(id, data) {
    return await axios.get(`${process.env.SERVER_API}/sensores/lista`, {
      headers: AutorizaHeader()
    });
  }
}

export default new PacienteService();
