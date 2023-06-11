import { Axios } from '../utils/AxiosUtils';

class SocketService {
  async getSensorsList() {
    const { data } = await Axios.get('/api/websocket/list');
    return data?.content;
  }

  async getMetadata() {
    const { data } = await Axios.get('/api/websocket/metadata');
    return data?.content;
  }
}

export default new SocketService();
