import { Axios } from '../utils/AxiosUtils'

class SessionService {
  async getMetadata() {
    const { data } = await Axios.get(`/api/session/metadata`)
    return data?.content
  }

  async getSession({ id }) {
    const { data } = await Axios.get(`/api/session/${id}`)
    return data?.content
  }

  async postSession(bean) {
    const { data } = await Axios.post(`/api/session`, bean)
    return data?.content
  }

  async getMovement({ id, movementId }) {
    const { data } = await Axios.get(`/api/session/${id}/movement/${movementId}`)
    return data?.content
  }

  async getCalculationVariabilityCenter({ id, movementId, signal }) {
    const { data } = await Axios.get(`/api/session/${id}/movement/${movementId}/scilab`, {
      signal,
    })
    return data?.content
  }
}

export default new SessionService()
