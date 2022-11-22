// This is just an example,
// so you can safely delete all default props below

export default {
  failed: "Ação falhada",
  success: "Ação realizada com sucesso",
  form: {
    error: "Existem erros no formulário, revise-o salve novamente.",
  },
  axios: {
    404: "Endpoint não encontrado",
  },
  socket: {
    success: "[WebSocket] Conexão com o sensor feita com websocket!",
    error: "[WebSocket] Erro no servidor websocket!",
    close: "[WebSocket] Websocket desconectado do servidor!",
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
      title: "Registrar",
      caption: "Para registro",
    },
    profile: {
      title: "Perfil",
      caption: "Visualizar perfil",
    },
    patient: {
      title: "Pacientes",
      caption: "Visualizar pacientes",
    },
  },
  main: {
    logout: "Realmente deseja sair?",
    yes: "Sim",
    no: "Não",
  },
  session: {
    procedure: "Procedimento",
    movement: "Movimento",
    session: "Sessão",
    weight: "Peso",
    select_sensor: "Selecionar sensores",
    select_procedure: "Selecionar procedimento",
    run_procedure: "Captar medições",
    next: "Próxima",
    previous: "Voltar",
    save: "Salvar",
    tab: "Gráfico",
    start: "Iniciar",
    restart: "Reiniciar",
    stop: "Parar",
    sensors: "Sensores",
    spreadsheet: "Planilha",
    export: "Exportar",
    close: "Fechar",
    fullscreen: "Tela cheia",
    connect_sensor: "Conectar ao sensor",
    procedure_next_error:
      "Existem erros no formulário, revise-o e tente novamente.",
    sensor_next_error:
      "Numero de sensores inferior ao mínimo requerido para o procedimento.",
    no_sensor_available: "Nenhum sensor disponível.",
    number_of_measurements: "Numero de medições",
    runtime: "Tempo de execução",
    graphic_temporarily_unavailable: "Gráfico temporarimente indisponivel.",
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
