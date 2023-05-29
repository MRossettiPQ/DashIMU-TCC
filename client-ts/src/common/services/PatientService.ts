import { Axios } from '../utils/AxiosUtils';
import { Patient } from '../models/Patient';
import { GenericAbortSignal } from 'axios';

interface PatientPageParam {
  id: number;
  signal?: GenericAbortSignal;
}

interface PatientListParam {
  term?: string;
  rpp?: number;
  page?: number;
  signal?: GenericAbortSignal;
}

interface MensurationListParam {
  idPatient: number;
  term?: string;
  rpp?: number;
  page?: number;
  signal?: GenericAbortSignal;
}

class PatientService {
  async getPatient({ id, signal }: PatientPageParam) {
    const { data } = await Axios.get(`/api/patient/${id}`, { signal });
    return data?.content;
  }

  async getPatientList({ term, rpp, page, signal }: PatientListParam) {
    const { data } = await Axios.get('/api/patient/', {
      signal,
      params: {
        term,
        rpp,
        page,
      },
    });
    return data?.content;
  }

  async getSessionList({
    idPatient,
    term,
    rpp,
    page,
    signal,
  }: MensurationListParam) {
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

  async postPatient(bean: Patient, signal?: GenericAbortSignal) {
    const { data } = await Axios.post('/api/patient', bean, { signal });
    return data?.content;
  }
}

export default new PatientService();
