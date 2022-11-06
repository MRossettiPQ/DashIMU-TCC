<template>
  <q-page class="flex flex-center">
    <q-card class="login-card" flat>
      <q-form ref="mainForm" class="col" greedy>
        <q-card-section class="form-lines">
          <div class="row items-center m-b-32">
            <h3 class="title col">Entrar</h3>
          </div>

          <q-input
            v-model="bean.username"
            :rules="[$validators.notBlank]"
            class="row"
            filled
            label="Username"
            type="text"
          />

          <q-input
            v-model="bean.password"
            :rules="[$validators.notBlank]"
            class="row"
            filled
            label="Senha"
            type="password"
          />

          <q-btn
            color="primary"
            label="Entrar"
            size="lg"
            unelevated
            @click="onSubmit"
            :loading="loading"
          />

          <p class="register">
            Não possui conta?
            <router-link to="register">register</router-link>
          </p>
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script src="./Login.js" />

<style lang="stylus" scoped>
.title {
  text-align: center;
  font-weight: bold;
  font-size: 32px;
  color: $dark;
}

.register {
  color: $faded;
  width: 100%;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 0;

  a {
    font-weight: bold;
    color: $dark;
  }
}

.login-card {
  width: 470px;
  padding: 46px 46px;
}
</style>
