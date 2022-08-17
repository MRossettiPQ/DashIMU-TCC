import {Axios} from '../utils/AxiosUtils';

class SciLabService {
  async postCentralVariabilidadeSalto({ data }) {
    const request = await Axios.post(`/api/scilab/centralvariabilidadesalto`, data);
    return request?.data
  }
}

export default new SciLabService();
