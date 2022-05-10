import axios from 'axios';
import AutorizaHeader from './AutorizaHeader';

class PacienteService {

  async getPaciente(id) {
    return await axios.get(`${process.env.SERVER_API}/api/paciente/${id}`, {
      headers: AutorizaHeader()
    });
  }

  async getListaPaciente() {
    return await axios.get(`${process.env.SERVER_API}/api/paciente`, {
      headers: AutorizaHeader()
    });
  }

  async postPaciente({id, data}) {
    return await axios.post(`${process.env.SERVER_API}/api/paciente/${id}/cadastropaciente`, data, {
      headers: AutorizaHeader()
    });
  }
}

export default new PacienteService();
