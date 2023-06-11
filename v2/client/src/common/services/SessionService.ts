import { Axios } from '../utils/AxiosUtils';
import { SessionBean } from 'src/common/models/Session';
import { GenericAbortSignal } from 'axios';

interface MensurationListSessionParam {
  sessionId: number;
  movementId: number;
  term?: string;
  rpp?: number;
  page?: number;
  signal?: GenericAbortSignal;
}

interface CalculationVariabilityCenterParam {
  sessionId: number;
  signal?: GenericAbortSignal;
}

class SessionService {
  async getMetadata() {
    const { data } = await Axios.get('/api/session/metadata');
    return data?.content;
  }

  async getSession(id: number) {
    const { data } = await Axios.get(`/api/session/${id}`);
    return data?.content;
  }

  async getMensurationListBySession({
    sessionId,
    movementId,
    term,
    rpp,
    page,
    signal,
  }: MensurationListSessionParam) {
    const { data } = await Axios.get(
      `/api/session/${sessionId}/movement/mensuration`,
      {
        signal,
        params: {
          term,
          rpp,
          page,
          movementId,
        },
      }
    );
    return data?.content;
  }

  async postSession(bean: SessionBean) {
    const { data } = await Axios.post('/api/session', bean);
    return data?.content;
  }

  async getCalculationVariabilityCenter({
    sessionId,
    signal,
  }: CalculationVariabilityCenterParam) {
    const { data } = await Axios.get(`/api/session/${sessionId}/scilab`, {
      signal,
    });
    return data?.content;
  }
}

export default new SessionService();
