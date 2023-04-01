import { Axios } from "../utils/AxiosUtils";

class PatientService {
  async getPatient({ id, signal }) {
    const { data } = await Axios.get(`/api/patient/${id}`, { signal });
    return data?.content;
  }

  async getPatientList({ term, rpp, page, signal } = {}) {
    const { data } = await Axios.get(`/api/patient/`, {
      signal,
      params: {
        term,
        rpp,
        page,
      },
    });
    return data?.content;
  }

  async getMensurationList({ idPatient, term, rpp, page, signal } = {}) {
    const { data } = await Axios.get(`/api/patient/${idPatient}/session`, {
      signal,
      params: {
        term,
        rpp,
        page,
      },
    });
    return data?.content;
  }

  async postPatient(bean, signal) {
    const { data } = await Axios.post(`/api/patient`, bean, { signal });
    return data?.content;
  }
}

export default new PatientService();
