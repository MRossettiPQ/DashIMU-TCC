import { Axios } from '../utils/AxiosUtils';

class DevService {
  async getMetadata() {
    const { data } = await Axios.get('/ping');
    return data?.content;
  }
}

export default new DevService();
