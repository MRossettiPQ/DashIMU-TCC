<template>
  <q-dialog ref="dialog" full-width full-height class="dialog">
    <q-card class="column full-height dialog-card">
      <q-card-section class="div-header">
        <div class="text-h6" v-if="id">Paciente nº {{ id }}</div>
        <div class="text-h6" v-else>Cadastrar novo paciente</div>
        <q-btn v-close-popup flat label="Fechar" />
      </q-card-section>
      <q-separator />
      <q-card-section class="col form-column form-column__gap">
        <q-form greedy ref="mainForm" class="col form-lines form-lines__gap-sm">
          <q-input
            v-model="bean.nomePaciente"
            filled
            label="Nome"
            :rules="[$validators.notBlank]"
          />
          <masked-input
            v-model="bean.cpfPaciente"
            filled
            label="CPF"
            :rules="[$validators.notBlank, $validators.cpf]"
            type="cpf"
          />
          <date-time-picker
            v-model="bean.nascPaciente"
            filled
            label="Data de Nascimento"
            :rule="[$validators.notBlank, $validators.dateBorn]"
          />
          <masked-input
            v-model="bean.telefonePaciente"
            filled
            label="Telefone"
            type="telefone"
            :rules="[$validators, $validators.telefone]"
          />
          <q-input
            v-model="bean.emailPaciente"
            filled
            label="Email"
            type="email"
            :rules="[$validators.notBlank, $validators.email]"
          />
          <masked-input
            v-model="bean.alturaPaciente"
            filled
            label="Altura"
            type="money"
            prefix="m"
            :rules="[$validators.notBlank]"
          />
        </q-form>
        <q-table
          class="col"
          v-if="id"
          title="Treats"
          :data="dataTable"
          :columns="columns"
          row-key="id"
          :filter="filter"
          :loading="loading"
          @row-click="openDialog"
          flat
        >
          <template #top>
            <q-btn
              color="primary"
              :disable="loading"
              label="Nova sessão"
              @click="toMedicao"
            />
            <q-space />
            <q-input
              v-model="filter"
              outlined
              borderless
              dense
              debounce="300"
              color="primary"
            >
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn
          color="primary"
          :label="id !== null ? 'atualizar' : 'cadastrar'"
          size="lg"
          @click="save"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script src="./Paciente.js" />

<style lang="stylus" scoped>
.div-header
  width 100%
  display flex
  justify-content space-between
</style>
