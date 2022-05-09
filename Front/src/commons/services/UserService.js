import axios from 'axios';
import AutorizaHeader from './AutorizaHeader';

class UserService {
  async getPublicContent() {
    return await axios.get(`${process.env.SERVER_API}/all`);
  }

  async getPerfil() {
    return await axios.get(`${process.env.SERVER_API}/perfil`, {headers: AutorizaHeader()});
  }

  async getFisioBoard() {
    return await axios.get(`${process.env.SERVER_API}/fisio`, {headers: AutorizaHeader()});
  }

  async getPacienteBoard() {
    return await axios.get(`${process.env.SERVER_API}/paciente`, {headers: AutorizaHeader()});
  }
}

export default new UserService();
