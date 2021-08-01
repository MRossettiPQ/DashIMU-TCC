<template>
  <div id="app">
    <!-- Fixed navbar -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Dash IMU</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link to="/home" class="nav-link  active">
                <font-awesome-icon icon="home" /> Home
              </router-link>
            </li>
            <li v-if="showAdminBoard" class="nav-item active">
              <router-link to="/admin" class="nav-link">
              Admin
              </router-link>
            </li>
            <li v-if="showPacienteBoard" class="nav-item">
              <router-link to="/paciente" class="nav-link">
                Paciente
              </router-link>
            </li>
            <li v-if="showFisioBoard" class="nav-item">
              <router-link v-if="currentUser" to="/fisio" class="nav-link">
                Fisioterapeuta
              </router-link>
            </li>
            <li v-if="showSensorBoard" class="nav-item">
              <router-link v-if="currentUser" to="/leitura-sensor" class="nav-link">
                Sensor
              </router-link>
            </li>
          </ul>
          <div v-if="currentUser" >
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>

          <div v-if="!currentUser" class="navbar-nav ml-auto">
            <router-link to="/login" class="nav-link">
              <button type="button" class="btn btn-outline-light me-2">
                <font-awesome-icon icon="sign-in-alt" /> Login
              </button>
            </router-link>
            <router-link to="/register" class="nav-link">
              <button type="button" class="btn btn-warning">
                <font-awesome-icon icon="user-plus" /> Sign-up
              </button>
            </router-link>
          </div>
        
          <div v-if="currentUser" class="navbar-nav ml-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <font-awesome-icon icon="user" /> Menu
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <router-link to="/profile" class="dropdown-item">
                    <font-awesome-icon icon="user" />
                    Perfil
                  </router-link>
                </li>
                <li>
                  <a class="dropdown-item" @click.prevent="logOut">
                    <font-awesome-icon icon="sign-out-alt" /> LogOut
                  </a>
                </li>
              </ul>
            </li>
          </div>
        </div>
      </div>
    </nav>
    <div class="flex-shrink-0">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showFisioBoard() {
      if (this.currentUser && this.currentUser["funcao"]) {
        return this.currentUser["funcao"].includes("ROLE_FISIO");
      }
      return false;
    },
    showSensorBoard() {
      if (this.currentUser && this.currentUser["funcao"]) {
        return this.currentUser["funcao"].includes("ROLE_FISIO");
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
