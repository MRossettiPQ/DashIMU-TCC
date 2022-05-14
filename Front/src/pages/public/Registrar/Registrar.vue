<template>
  <q-page class="flex flex-center">
    <q-card class="cadastro-card">
      <q-card-section>
        <q-form greedy ref="mainForm" class="form-lines">
          <rot-input-date
            class="row m-2"
            v-model="bean.nascUsuario"
            minimal
            filled
            label="Data de Nascimento"
            :rule="[$validators.notBlank, $validators.dateBorn]"
          />
          <div class="row items-center">
            <h3 class="title col">Cadastrar</h3>
          </div>

          <q-input
            class="row"
            filled
            v-model="bean.nomeUsuario"
            label="Nome"
            :rules="[$validators.notBlank]"
          />
          <q-input
            class="row"
            filled
            v-model="bean.usernameUsuario"
            label="Username"
            :rules="[$validators.notBlank]"
          />
          <rot-input-date
            class="row m-2"
            v-model="bean.nascUsuario"
            minimal
            filled
            label="Data de Nascimento"
            :rule="[$validators.notBlank, $validators.dateBorn]"
          />
          <q-input
            class="row"
            v-model="bean.telefoneUsuario"
            filled
            label="Telefone"
            :rules="[$validators.notBlank, $validators.telefone]"
          />
          <q-input
            class="row"
            v-model="bean.emailUsuario"
            filled
            label="Email"
            type="email"
            :rules="[$validators.notBlank, $validators.email]"
          />
          <q-input
            class="row"
            v-model="bean.senhaUsuario"
            filled
            label="Senha"
            type="password"
            :rules="[$validators.notBlank]"
          />
          <q-input
            class="row"
            v-model="bean.senhaConfirmar"
            filled
            label="Repetir Senha"
            type="password"
            :rules="[$validators.notBlank, $validators.equal(bean.senhaUsuario)]"
          />
          <q-btn
            class="row cadastro-btn"
            color="primary"
            label="cadastrar-se"
            size="lg"
            @click="onSubmit"
          />
        </q-form>
        <p class="possui-conta">
          Já possui uma conta?
          <router-link to="logar">Entrar</router-link>
        </p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script src="./Registrar.js" />

<style lang="stylus" scoped>
.title
  text-align center
  font-weight bold
  font-size 32px
  color $dark

.possui-conta
  color $faded
  width 100%
  text-align center
  margin-top 8px
  margin-bottom 0

  a
    font-weight bold
    color $dark

.cadastro-btn
  width 100%
  height 64px

.cadastro-card
  width 470px
  padding 30px 46px
</style>
