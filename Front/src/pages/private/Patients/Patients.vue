<template>
  <section ref="telaPacientes" class="responsive-height">
    <div class="row responsive-content form-column form-column__padding">
      <q-table
        :columns="columns"
        :data="pagination.list"
        :filter="filter"
        :loading="loading"
        bordered
        class="col"
        flat
        row-key="id"
        title="Treats"
        @row-click="openDialog"
      >
        <template #top class="flex">
          <q-btn
            :disable="loading"
            :label="!$q.platform.is.mobile ? 'Paciente' : null"
            color="primary"
            dense
            icon="add"
            unelevated
            @click="openDialog"
          />
          <q-space />
          <q-input
            v-model="filter"
            borderless
            class="col-5"
            color="primary"
            debounce="300"
            dense
            outlined
          >
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
  </section>
</template>

<script src="./Patients.js" />

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
