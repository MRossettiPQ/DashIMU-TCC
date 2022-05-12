<template>
  <section class="responsive-height" ref="telaPacientes">
    <div class="row responsive-content form-column form-column__padding">
      <q-table
        class="col"
        title="Treats"
        :data="dataTable"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :loading="loading"
        @row-click="openDialog"
        bordered
        flat
      >
        <template #top class="flex">
          <q-btn
            color="primary"
            :disable="loading"
            icon="add"
            :label="!$q.platform.is.mobile ? 'Paciente' : null"
            @click="openDialog"
            unelevated
            dense
          />
          <q-space/>
          <q-input
            class="col-5"
            outlined
            v-model="filter"
            borderless
            dense
            debounce="300"
            color="primary"
          >
            <template #append>
              <q-icon name="search"/>
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
  </section>
</template>

<script src="./Pacientes.js"/>

<style lang="stylus" scoped>
.dialog-card
  width 100vw
  height 100vh

.grid-cadastro
  padding 16px
  height 100%
  width 100%
  display grid

.grid-conteudo
  padding 16px
  height 100%
  width 100%
  display grid
  grid-template-columns 20% 80%

.grid-medicao
  padding 16px
  height 100%
  width 100%
  display flex
  gap 16px
  flex-direction column

h1
  font-size 2rem
  padding 0
  margin 0

strong, p
  font-size 1.5em
</style>
