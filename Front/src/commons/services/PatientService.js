import { Axios } from "../utils/AxiosUtils";

class PatientService {
  async getPatient({ id }) {
    const { data } = await Axios.get(`/api/patient/${id}`);
    return data?.content;
  }

  async getPatientList() {
    const { data } = await Axios.get(`/api/patient/`);
    return data?.content;
  }

  async postPatient(bean) {
    const { data } = await Axios.post(`/api/patient`, bean);
    return data?.content;
  }
}

export default new PatientService();
