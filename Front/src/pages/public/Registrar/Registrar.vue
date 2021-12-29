<template>
  <q-page class="flex flex-center">
    <q-card class="cadastro-card">
      <q-card-section>
        <div class="row items-center m-b-32">
          <q-btn round flat icon="navigate_before" to="logar" />
          <h5 class="title col">Cadastrar</h5>
        </div>
        <q-form @submit="onSubmit(cadastro)">
          <q-input
            v-model="cadastro.nomeUser"
            filled
            label="Nome"
            class="m-t-40"
          />
          <q-input
            v-model="cadastro.usernameUser"
            filled
            label="Username"
            class="m-t-40"
          />
          <date-time-picker
            v-model="cadastro.nascUser"
            filled
            label="Data de Nascimento"
            class="m-t-8"
            :rule="[dataNascimentoValidator]"
          />
          <q-input
            v-model="cadastro.telefoneUser"
            filled
            label="Telefone"
            class="m-t-40"
          />
          <q-input
            v-model="cadastro.emailUser"
            filled
            label="Email"
            class="m-t-8"
            type="email"
            :rules="[$validators.notBlank]"
          />
          <q-input
            v-model="cadastro.senhaUser"
            filled
            label="Senha"
            type="password"
            class="m-t-8"
          />
          <q-input
            v-model="cadastro.senhaConfirmar"
            filled
            label="Repetir Senha"
            type="password"
            class="m-t-8"
            :rules="[
              (val) =>
                val == cadastro.senhaUser ||
                'As senhas informadas são diferentes',
            ]"
          />
          <q-btn
            color="primary"
            label="cadastrar-se"
            class="cadastro-btn"
            size="lg"
            type="submit"
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
  margin-top 16px

.cadastro-card
  width 470px
  padding 30px 46px
</style>
