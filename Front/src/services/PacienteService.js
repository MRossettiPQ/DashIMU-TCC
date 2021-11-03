import axios from "axios";
import AutorizaHeader from "./AutorizaHeader";

const API_URL = "http://localhost:9000/api/";

class PacienteService {
  getListaPaciente(data) {
    return axios.get(API_URL + "pacientes", {
      headers: AutorizaHeader()
    });
  }

  registerPaciente(paciente) {
    return axios.post(API_URL + "pacientes", {
      // headers: AutorizaHeader(),
      nomePaciente: paciente.nomePaciente,
      nascPaciente: paciente.nascPaciente,
      telefonePaciente: paciente.telefonePaciente,
      emailPaciente: paciente.emailPaciente,
      alturaPaciente: paciente.alturaPaciente,
      cpfPaciente: paciente.cpfPaciente,
      idUser: paciente.idUser
    });
  }
}

export default new PacienteService();
