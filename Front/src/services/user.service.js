import axios from 'axios';
import autorizaHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getFisioBoard() {
    return axios.get(API_URL + 'fisio', { headers: autorizaHeader() });
  }

  getPacienteBoard() {
    return axios.get(API_URL + 'paciente', { headers: autorizaHeader() });
  }

  getSensorBoard() {
    return axios.get(API_URL + 'leitura-sensor', { headers: autorizaHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: autorizaHeader() });
  }
}

export default new UserService();
