<template>
  <section class="responsive-height">
    <div class="row responsive-content form-column">
      <div v-if="bean !== null" class="col p-16">
        <h1>Account de {{ bean.nomeUser }}</h1>
        <q-form ref="mainForm" greedy>
          <q-card bordered class="form-column" flat>
            <q-card-section class="col form-lines form-lines__gap">
              <q-input
                v-model="bean.idUser"
                class="col"
                filled
                label="Id do User"
                readonly
                stack-label
              />
              <q-input
                v-model="bean.name"
                class="col"
                filled
                label="Nome"
                readonly
                stack-label
              />
            </q-card-section>

            <q-card-section class="col form-lines form-lines__gap">
              <q-input
                v-model="bean.email"
                class="col"
                filled
                label="E-mail"
                readonly
                stack-label
              />
              <q-input
                v-model="bean.accessToken"
                class="col"
                filled
                label="Token"
                readonly
                stack-label
              />
            </q-card-section>

            <q-card-section class="col form-lines form-lines__gap">
              <q-input
                v-model="bean.role"
                class="col"
                filled
                label="Funções do User"
                readonly
                stack-label
              />
            </q-card-section>
          </q-card>
        </q-form>
      </div>
    </div>
  </section>
</template>

<script src="./Account.js" />

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
