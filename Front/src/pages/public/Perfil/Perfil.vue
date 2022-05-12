<template>
  <section class="responsive-height">
    <div class="row responsive-content form-column">
      <div class="col p-16" v-if="bean !== null">
        <h1>Perfil de {{ bean.nomeUsuario }}</h1>
        <q-form greedy ref="mainForm">
          <q-card bordered flat class="form-column">
            <q-card-section class="col form-lines form-lines__gap">
              <q-input
                class="col"
                v-model="bean.idUsuario"
                filled
                stack-label
                readonly
                label="Id do usuario"
              />
              <q-input
                class="col"
                v-model="bean.nomeUsuario"
                filled
                stack-label
                readonly
                label="Nome"
              />
            </q-card-section>

            <q-card-section class="col form-lines form-lines__gap">
              <q-input
                class="col"
                v-model="bean.nascUsuario"
                filled
                stack-label
                readonly
                label="Data de nascimento"
              />
              <q-input
                class="col"
                v-model="bean.telefoneUsuario"
                filled
                stack-label
                readonly
                label="Telefone"
              />
            </q-card-section>

            <q-card-section class="col form-lines form-lines__gap">
              <q-input
                class="col"
                v-model="bean.emailUsuario"
                filled
                stack-label
                readonly
                label="E-mail"
              />
              <q-input
                class="col"
                v-model="bean.accessToken"
                filled
                stack-label
                readonly
                label="Token"
              />
            </q-card-section>
          </q-card>
        </q-form>
      </div>
    </div>
  </section>
</template>

<script src="./Perfil.js" />

<style lang="stylus" scoped>
@import "~src/css/mixins.styl"
h1
  font-size 2rem
  padding 0
  margin 0

.grid-conteudo
  padding 16px
  display flex
  gap 16px
  flex-direction column

.form-column
  flex-direction row
  +mobile-portrait()
    padding 16px
    gap 16px
    flex-direction column

.form-lines
  +mobile-portrait()
    padding 0
</style>
