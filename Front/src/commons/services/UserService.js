import axios from 'axios';
import AutorizaHeader from './AutorizaHeader';

class UserService {
  async getPublicContent() {
    return await axios.get(`${process.env.SERVER_API}/api/all`);
  }

  async getPerfil() {
    return await axios.get(`${process.env.SERVER_API}/api/perfil`, {headers: AutorizaHeader()});
  }

  async getFisioBoard() {
    return await axios.get(`${process.env.SERVER_API}/api/fisio`, {headers: AutorizaHeader()});
  }

  async getPacienteBoard() {
    return await axios.get(`${process.env.SERVER_API}/api/paciente`, {headers: AutorizaHeader()});
  }
}

export default new UserService();
