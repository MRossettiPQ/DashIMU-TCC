import { Axios } from "../utils/AxiosUtils";

class SciLabService {
  async postCentralVariabilidadeSalto(bean) {
    const { data } = await Axios.post(
      `/api/scilab/centralvariabilidadesalto`,
      bean
    );
    return data?.content;
  }
}

export default new SciLabService();
