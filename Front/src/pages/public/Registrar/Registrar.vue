<template>
  <q-page class="flex flex-center">
    <q-card class="cadastro-card">
      <q-card-section>
        <q-form greedy ref="mainForm" class="form-lines">
          <div class="row items-center">
            <h3 class="title col">Cadastrar</h3>
          </div>

          <q-input
            class="row"
            filled
            v-model="bean.nomeUser"
            label="Nome"
            :rules="[$validators.notBlank]"
          />
          <q-input
            class="row"
            filled
            v-model="bean.usernameUser"
            label="Username"
            :rules="[$validators.notBlank]"
          />
          <date-time-picker
            class="row"
            filled
            v-model="bean.nascUser"
            label="Data de Nascimento"
            :rule="[$validators.notBlank, $validators.dateBorn]"
          />
          <q-input
            class="row"
            v-model="bean.telefoneUser"
            filled
            label="Telefone"
            :rules="[$validators.notBlank]"
          />
          <q-input
            class="row"
            v-model="bean.emailUser"
            filled
            label="Email"
            type="email"
            :rules="[$validators.notBlank]"
          />
          <q-input
            class="row"
            v-model="bean.senhaUser"
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
            :rules="[$validators.notBlank, $validators.equal(bean.senhaUser)]"
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
