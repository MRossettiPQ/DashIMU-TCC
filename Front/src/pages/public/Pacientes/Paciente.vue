<template>
  <q-dialog ref="dialog" full-width full-height class="dialog">
    <q-card class="column full-height dialog-card">
      <dialog-header :id="id" idMsg="Paciente nº" elseMsg="Novo paciente" :labelRightButton="!$q.platform.is.mobile ? 'Fechar' : null" />
      <q-separator/>
      <q-card-section :class="$q.platform.is.mobile ? 'col form-lines form-lines__gap' : 'col form-column form-column__gap'  ">
        <q-form greedy ref="mainForm" class="col form-lines form-lines__gap-sm">
          <q-input
            v-model="bean.nomePaciente"
            filled
            label="Nome"
            :rules="[$validators.notBlank]"
          />
          <q-input
            v-model="bean.cpfPaciente"
            filled
            label="CPF"
            mask="###.###.###-##"
            :rules="[$validators.notBlank, $validators.cpf]"
          />
          <q-input
            v-model="bean.nascPaciente"
            filled
            label="Data de Nascimento"
            mask="##-##-####"
            :rules="[$validators.notBlank, $validators.dateBorn]"
          />
<!--          <rot-input-date-->
<!--            v-model="bean.nascPaciente"-->
<!--            minimal-->
<!--            filled-->
<!--            label="Data de Nascimento"-->
<!--            :rule="[$validators.notBlank, $validators.dateBorn]"-->
<!--            mask="YYYY-MM-DD"-->
<!--          />-->
          <q-input
            v-model="bean.telefonePaciente"
            filled
            label="Telefone"
            mask="(##) #####-####"
            :rules="[$validators.notBlank, $validators.telefone]"
          />
          <q-input
            v-model="bean.emailPaciente"
            filled
            label="Email"
            type="email"
            :rules="[$validators.notBlank, $validators.email]"
          />
          <q-input
            v-model="bean.alturaPaciente"
            filled
            label="Altura"
            prefix="m"
            :rules="[$validators.notBlank]"
          />
        </q-form>
        <table-sessao :id="id"/>
      </q-card-section>
      <q-separator/>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn
          color="primary"
          :label="id !== null ? 'atualizar' : 'cadastrar'"
          size="md"
          dense
          @click="save"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script src="./Paciente.js"/>

<style lang="stylus" scoped>
.div-header
  width 100%
  display flex
  justify-content space-between
</style>
