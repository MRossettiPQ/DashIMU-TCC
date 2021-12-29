import PacienteService from "src/services/PacienteService";

export default {
  data() {
    return {
      content: "",
      cadastro: {},
      perfilPaciente: false,
      adicionarPaciente: false,
      loading: false,
      filter: "",
      perfilAberto: {},
      rowCount: 10,
      columns: [
        {
          name: "nomePaciente",
          align: "left",
          label: "Nome",
          field: "nomePaciente",
        },
        {
          name: "idPaciente",
          align: "left",
          label: "ID Paciente",
          field: "nomePaciente",
        },
        {
          name: "cpfPaciente",
          align: "left",
          label: "CPF",
          field: "cpfPaciente",
        },
      ],
      data: [],
    };
  },
  mounted() {
    PacienteService.getListaPaciente().then(
      (response) => {
        console.log("lista de pacientes", response);
        this.content = response.data;
        this.data = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    atualizarPerfil() {
      this.perfilAberto = {};
      //console.log(this.perfilAberto);
    },

    dataNascimentoValidator(value) {
      return (
        moment(value, "DD/MM/YYYY").isBefore(moment().subtract(18, "years")) ||
        "Deve ser maior de 18 anos."
      );
    },

    onSubmit(paciente) {
      paciente.idUser = this.$store.state.autentica.user.idUser;
      //console.log(paciente);
      this.$store.dispatch("paciente/register", paciente).then(
        (data) => {
          this.message = data.message;
          this.reloadTabela();
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    reloadTabela() {
      PacienteService.getListaPaciente().then(
        (response) => {
          //console.log("lista de pacientes", response);
          this.content = response.data;
          this.data = response.data;
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    onRowClick(evt, row) {
      this.perfilPaciente = true;
      this.perfilAberto = row;
      //console.log("clicked on", row);
    },
    addRow() {
      this.loading = true;
      this.adicionarPaciente = true;
      setTimeout(() => {
        //   const index = Math.floor(Math.random() * (this.data.length + 1)),
        //     row = this.original[Math.floor(Math.random() * this.original.length)];
        //   if (this.data.length === 0) {
        //     this.rowCount = 0;
        //   }
        //   row.id = ++this.rowCount;
        //   const addRow = { ...row }; // extend({}, row, { name: `${row.name} (${row.__count})` })
        //   this.data = [
        //     ...this.data.slice(0, index),
        //     addRow,
        //     ...this.data.slice(index)
        //   ];
        this.loading = false;
      }, 500);
    },
    // removeRow() {
    //   this.loading = true;
    //   setTimeout(() => {
    //     const index = Math.floor(Math.random() * this.data.length);
    //     this.data = [
    //       ...this.data.slice(0, index),
    //       ...this.data.slice(index + 1)
    //     ];
    //     this.loading = false;
    //   }, 500);
    // }
  },
};
