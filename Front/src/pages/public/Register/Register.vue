<template>
  <q-page class="flex flex-center">
    <q-card class="cadastro-card" flat>
      <q-card-section>
        <q-form ref="mainForm" class="form-lines" greedy>
          <div class="row items-center">
            <h3 class="title col">Cadastrar</h3>
          </div>

          <q-input
            v-model="bean.name"
            :rules="[$validators.notBlank]"
            class="row"
            filled
            label="Nome"
          />
          <q-input
            v-model="bean.username"
            :rules="[$validators.notBlank]"
            class="row"
            filled
            label="Username"
          />
          <q-input
            v-model="bean.email"
            :rules="[$validators.notBlank, $validators.email]"
            class="row"
            filled
            label="Email"
            type="email"
          />
          <q-input
            v-model="bean.password"
            :rules="[$validators.notBlank]"
            class="row"
            filled
            label="Senha"
            type="password"
          />
          <q-input
            v-model="bean.passwordConfirm"
            :rules="[$validators.notBlank, $validators.equal(bean.password)]"
            class="row"
            filled
            label="Repetir Senha"
            type="password"
          />
          <q-btn
            class="row cadastro-btn"
            color="primary"
            label="cadastrar-se"
            size="lg"
            @click="onSubmit"
            :loading="loading"
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

<script src="./Register.js" />

<style lang="stylus" scoped>
.title {
  text-align: center;
  font-weight: bold;
  font-size: 32px;
  color: $dark;
}

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
