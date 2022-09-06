<template>
  <q-page class="flex flex-center">
    <q-card class="login-card" flat>
      <q-form ref="mainForm" class="col" greedy>
        <q-card-section class="form-lines">
          <h3 class="title col">Settings</h3>

          <q-input
            v-model="bean.api"
            :rules="[$validators.notBlank]"
            class="row"
            filled
            label="API"
            placeholder="Ex: http://localhost:9000"
            type="text"
          />

          <q-btn
            color="primary"
            label="Save"
            size="lg"
            unelevated
            @click="onSubmit"
            :loading="loading"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script src="./Configuration.js" />

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
