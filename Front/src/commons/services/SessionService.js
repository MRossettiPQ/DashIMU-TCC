import { Axios } from "../utils/AxiosUtils";

class SessionService {
  async getSession(id) {
    const { data } = await Axios.get(`/api/session/${id}`);
    return data?.content;
  }

  async getSessionList() {
    const { data } = await Axios.get(`/api/session`);
    return data?.content;
  }

  async getMensurationList() {
    const { data } = await Axios.get(`/api/session`);
    return data?.content;
  }

  async postSession(id, bean) {
    const { data } = await Axios.post(
      `/api/session/${id}/cadastropaciente`,
      bean
    );
    return data?.content;
  }
}

export default new SessionService();
