import {Axios} from "../utils/AxiosUtils";

class SessionService {
  async getMetadata() {
    const {data} = await Axios.get(`/api/session/metadata`);
    return data?.content;
  }

  async getSession({ id }) {
    const {data} = await Axios.get(`/api/session/${id}`);
    return data?.content;
  }

  async getSessionList() {
    const {data} = await Axios.get(`/api/session`);
    return data?.content;
  }

  async getMensurationList() {
    const {data} = await Axios.get(`/api/session`);
    return data?.content;
  }

  async postSession(bean) {
    const {data} = await Axios.post(`/api/session`, bean);
    return data?.content;
  }

  async getCalculationVariabilityCenter({sessionId}) {
    const {data} = await Axios.get(`/api/session/${sessionId}/scilab`);
    return data?.content;
  }
}

export default new SessionService();
