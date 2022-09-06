import { Axios } from "../utils/AxiosUtils";

class SciLabService {
  async postCentralVariabilidadeSalto(bean) {
    const { data } = await Axios.post(`/api/session`, bean);
    return data?.content;
  }
}

export default new SciLabService();
