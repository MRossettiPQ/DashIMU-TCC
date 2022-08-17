import {Axios} from '../utils/AxiosUtils';

class SocketService {
  async getSensores() {
    const request = await Axios.get(`/api/sensor/list`);
    return request?.data
  }
}

export default new SocketService();
