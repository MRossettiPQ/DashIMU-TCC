import { Axios } from "../utils/AxiosUtils";

class UserService {
  async getPerfil() {
    const request = await Axios.get(`/api/perfil`);
    return request?.data;
  }

  async getPublicContent() {
    const request = await Axios.get(`/api/all`);
    return request?.data;
  }

  async getFisioBoard() {
    const request = await Axios.get(`/api/fisio`);
    return request?.data;
  }

  async getPacienteBoard() {
    const request = await Axios.get(`/api/paciente`);
    return request?.data;
  }
}

export default new UserService();
