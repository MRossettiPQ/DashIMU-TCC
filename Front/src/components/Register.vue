<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="usernameUser">Username</label>
            <Field name="usernameUser" type="text" class="form-control" />
            <ErrorMessage name="usernameUser" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="nomeUser">Nome Completo</label>
            <Field name="nomeUser" type="text" class="form-control" />
            <ErrorMessage name="nomeUser" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="emailUser">Email</label>
            <Field name="emailUser" type="email" class="form-control" />
            <ErrorMessage name="emailUser" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="nascUser">Data de Nascimento</label>
            <Field name="nascUser" type="date" class="form-control" />
            <ErrorMessage name="nascUser" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="telefoneUser">Telefone</label>
            <Field name="telefoneUser" type="number" class="form-control" />
            <ErrorMessage name="telefoneUser" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="senhaUser">Senha</label>
            <Field name="senhaUser" type="password" class="form-control" />
            <ErrorMessage name="senhaUser" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for=""></label>
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Cadastrar
            </button>
          </div>
        </div>
      </Form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      usernameUser: yup
        .string()
        .required("Campo obrigatorio!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      nomeUser: yup
        .string()
        .required("Campo obrigatorio!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      nascUser: yup
        .date()
        .required("Campo obrigatorio!"),
      telefoneUser: yup
        .number()
        .required("Campo obrigatorio!"),
      emailUser: yup
        .string()
        .required("Campo obrigatorio!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      senhaUser: yup
        .string()
        .required("Campo obrigatorio!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}
</style>
