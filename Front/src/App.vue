<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand">Dash IMU</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" />Home
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Tela Admin</router-link>
        </li>
        <li v-if="showPacienteBoard" class="nav-item">
          <router-link to="/paciente" class="nav-link"
            >Tela Paciente</router-link
          >
        </li>
        <li v-if="showUsuarioBoard" class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link"
            >Fisioterapeuta</router-link
          >
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            Perfil:{{ currentUser.usernameUser }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showUsuarioBoard() {
      if (this.currentUser && this.currentUser["funcao"]) {
        return this.currentUser["funcao"].includes("ROLE_USUARIO");
      }

      return false;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser["funcao"]) {
        return this.currentUser["funcao"].includes("ROLE_ADMIN");
      }

      return false;
    },
    showPacienteBoard() {
      if (this.currentUser && this.currentUser["funcao"]) {
        return this.currentUser["funcao"].includes("ROLE_PACIENTE");
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
