<template>
  <q-page class="flex flex-center">
    <q-card class="login-card">
      <q-form greedy ref="mainForm" class="col">
        <q-card-section class="form-lines">
          <div class="row items-center m-b-32">
            <h3 class="title col">Entrar</h3>
          </div>

          <q-input
            v-model="bean.username"
            filled
            label="Username"
            type="text"
            class="row"
            :rules="[$validators.notBlank]"
          />

          <q-input
            v-model="bean.password"
            filled
            label="Senha"
            type="password"
            class="row"
            :rules="[$validators.notBlank]"
          />

          <q-btn
            color="primary"
            unelevated
            label="Entrar"
            size="lg"
            @click="onSubmit"
          />

          <p class="cadastre-se">
            Não possui conta?
            <router-link to="registrar">Cadastre-se</router-link>
          </p>
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script src="./Logar.js"/>

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

.login-card
  width 470px
  padding 46px 46px
</style>
