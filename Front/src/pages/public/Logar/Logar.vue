<template>
  <q-page class="flex flex-center">
    <q-card class="login-card">
      <q-card-section>
        <div class="row items-center m-b-32">
          <h5 class="title col">Entrar</h5>
        </div>

        <q-input
          filled
          label="Username"
          type="text"
          v-model="credencial.usernameUser"
          class="col m-t-16"
        />

        <q-input
          filled
          v-model="credencial.senhaUser"
          label="Senha"
          type="password"
          class="col m-t-16"
        />

        <q-btn
          color="primary"
          unelevated
          label="Entrar"
          class="login-btn"
          size="lg"
          @click="handleLogin(credencial)"
        />

        <p class="cadastre-se">
          Não possui conta?
          <router-link to="registrar">Cadastre-se</router-link>
        </p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script src="./Logar.js" />

<style lang="stylus" scoped>
.title
  text-align center
  font-weight bold
  font-size 32px
  color $dark

.lembrar-senha
  color $faded
  width 100%
  display flex
  justify-content flex-start

.recuperacao-senha
  color $faded
  width 100%
  display flex
  justify-content flex-end


.cadastre-se
  color $faded
  width 100%
  text-align center
  margin-top 8px
  margin-bottom 0

  a
    font-weight bold
    color $dark

.login-btn
  width 100%
  height 64px
  margin-top 24px

.login-card
  width 470px
  padding 30px 46px
</style>
