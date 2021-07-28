<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        Perfil de <strong>{{currentUser.usernameUser}}</strong>
      </h3>
    </header>
    <p>
      <strong>Nome:</strong>
      {{currentUser.nomeUser}}
    </p>
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.idUser}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.emailUser}}
    </p>
    <p>
      <strong>Telefone:</strong>
      {{currentUser.telefoneUser}}
    </p>
    <p>
      <strong>Nascimento:</strong>
      {{currentUser.nascUser}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="funcao in currentUser.funcao" :key="funcao">{{funcao}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>