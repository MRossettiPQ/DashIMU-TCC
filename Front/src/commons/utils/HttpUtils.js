import PacienteService from "src/commons/services/PacienteService";

const tableLoad = async (service, params) => {
  try {
    const error = {};
    const result = await service().then(
      response => {

      },
      error => {
      });
    return {result, error}
  } catch (e) {
    console.log(e);
  }
}
