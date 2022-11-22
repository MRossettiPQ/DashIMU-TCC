// This is just an example,
// so you can safely delete all default props below

export default {
  failed: "Action failed",
  success: "Action was successful",
  form: {
    error: "There are errors in the form, please review and save again.",
  },
  axios: {
    404: "Endpoint not found",
  },
  socket: {
    success: "[WebSocket] Connection to the sensor made with websocket!",
    error: "[WebSocket] Error on websocket server!",
    close: "[WebSocket] Websocket disconnected from server!",
  },
  menu: {
    home: {
      title: "Home",
      caption: "Tela inicial",
    },
    login: {
      title: "Login",
      caption: "Para logar",
    },
    register: {
      title: "Register",
      caption: "Register user",
    },
    profile: {
      title: "Profile",
      caption: "View profile",
    },
    patient: {
      title: "Patients",
      caption: "View patients",
    },
  },
  main: {
    logout: "Realmente deseja sair?",
    yes: "Yes",
    no: "No",
  },
  session: {
    procedure: "Procedure",
    session: "Session",
    movement: "Movement",
    weight: "Weight",
    select_sensor: "Select sensors",
    select_procedure: "Select procedure",
    run_procedure: "Run procedure",
    next: "Next",
    previous: "Previous",
    save: "Save",
    tab: "Graph",
    start: "Start",
    restart: "Restart",
    stop: "Stop",
    sensors: "Sensors",
    spreadsheet: "Spreadsheet",
    export: "Export",
    close: "Close",
    fullscreen: "Fullscreen",
    connect_sensor: "Connect sensor",
    procedure_next_error:
      "There are errors in the form, please review it and try again",
    sensor_next_error:
      "Number of sensors lower than the minimum required for the procedure.",
    no_sensor_available: "No sensor available.",
    number_of_measurements: "Number of measurements",
    runtime: "Runtime",
    graphic_temporarily_unavailable: "Graphic temporarily unavailable.",
  },
  validation: {
    cep: "CEP inválido",
    cnpj: "CNPJ inválido",
    cpf: "CPF inválido",
    rg: "RG inválido",
    date: "Data inválida",
    email: "E-mail inválido",
    max_i: "Tamanho máximo de ",
    max_f: "E-mail inválido",
    mandatory: "Preenchimento obrigatório",
    phone: "Telefone inválido",
    max_val: "O valor deve ser menor ou igual a ",
    min_val: "O valor deve ser maior ou igual a ",
    max_money_val: "O valor deve ser menor ou igual a ",
    equal: "As senhas informadas são diferentes",
    born_i: "Deve ser maior de ",
    born_f: "anos",
  },
  patients: {
    table_session: {},
    variability_center: {},
    measurement_history: {},
    patient: {},
  },
};
