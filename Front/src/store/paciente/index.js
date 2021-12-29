import PacienteService from "../../services/PacienteService";

export default {
  namespaced: true,
  actions: {
    register({ commit }, paciente) {
      return PacienteService.registerPaciente(paciente).then(
        (response) => {
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
  },
};
