import { Axios } from "../utils/AxiosUtils";

class SocketService {
  async getSensorsList() {
    const { data } = await Axios.get(`/api/sensor/list`);
    console.log(data)
    return data?.content;
  }
}

export default new SocketService();
