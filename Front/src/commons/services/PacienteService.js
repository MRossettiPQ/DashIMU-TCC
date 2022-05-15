import {Axios} from '../utils/AxiosUtils';

class PacienteService {
  async getPaciente(id) {
    const request = await Axios.get(`/api/paciente/${id}`);
    return request?.data
  }

  async getListaPaciente() {
    const request = await Axios.get(`/api/paciente`);
    return request?.data
  }

  async postPaciente({data}) {
    const request = await Axios.post(`/api/paciente/cadastropaciente`, data);;
    return request?.data
  }
}

export default new PacienteService();
