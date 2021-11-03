import axios from "axios";
import AutorizaHeader from "./AutorizaHeader";

const API_URL = "http://localhost:9000/api/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getPerfil() {
    return axios.get(API_URL + "fisio", { headers: AutorizaHeader() });
  }

  getFisioBoard() {
    return axios.get(API_URL + "fisio", { headers: AutorizaHeader() });
  }

  getPacienteBoard() {
    return axios.get(API_URL + "paciente", { headers: AutorizaHeader() });
  }
}

export default new UserService();
