import axios from "axios";
import AutorizaHeader from "./AutorizaHeader";

class PacienteService {
  async getSensores() {
    return await axios.get(`${process.env.SERVER_API}/api/sensores/lista`, {
      headers: AutorizaHeader()
    });
  }
}

export default new PacienteService();
