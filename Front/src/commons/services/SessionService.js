import { Axios } from "../utils/AxiosUtils";

class SessionService {
  async getMetadata() {
    const { data } = await Axios.get(`/api/session/metadata`);
    return data?.content;
  }

  async getSession({ id }) {
    const { data } = await Axios.get(`/api/session/${id}`);
    return data?.content;
  }

  async getMensurationListBySession({ idSession, term, rpp, page, signal }) {
    const { data } = await Axios.get(
      `/api/session/${idSession}/movement/mensuration`,
      {
        signal,
        params: {
          term,
          rpp,
          page,
        },
      }
    );
    return data?.content;
  }

  async postSession(bean) {
    const { data } = await Axios.post(`/api/session`, bean);
    return data?.content;
  }

  async getCalculationVariabilityCenter({ sessionId, signal }) {
    const { data } = await Axios.get(`/api/session/${sessionId}/scilab`, {
      signal,
    });
    return data?.content;
  }
}

export default new SessionService();
