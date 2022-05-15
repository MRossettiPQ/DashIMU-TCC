import {Axios} from '../utils/AxiosUtils';

class PacienteService {
  async getSensores() {
    const request = await Axios.get(`/api/sensores/lista`);
    return request?.data
  }
}

export default new PacienteService();
