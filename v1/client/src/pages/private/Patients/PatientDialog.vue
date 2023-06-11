<template>
  <q-dialog no-refocus ref="dialog" full-height full-width>
    <q-card class="column">
      <dialog-header
        :id="id"
        label-right-button="Close"
        id-msg="Paciente nº"
        else-msg="Novo paciente"
      />
      <loading-screen v-if="fetchData.loading" />
      <error-screen v-else-if="fetchData.hasError" />
      <q-card-section v-else-if="!fetchData.isNull" class="form-column gap-8 h-100 p-h-8">
        <q-form ref="mainForm" class="col form-lines w-100" greedy>
          <q-input
            v-model="fetchData.result.name"
            :rules="[$validators.notBlank]"
            outlined
            dense
            label="Nome"
          />
          <q-input
            v-model="fetchData.result.cpf"
            :rules="[$validators.notBlank, $validators.cpf]"
            outlined
            dense
            label="CPF"
            mask="###.###.###-##"
          />
          <q-input
            v-model="fetchData.result.phone"
            :rules="[$validators.notBlank, $validators.telefone]"
            outlined
            dense
            label="Telefone"
            mask="(##) #####-####"
          />
          <q-input
            v-model="fetchData.result.email"
            :rules="[$validators.notBlank, $validators.email]"
            outlined
            dense
            label="Email"
            type="email"
          />
          <q-input
            v-model="fetchData.result.stature"
            :rules="[$validators.notBlank]"
            outlined
            dense
            label="Altura"
            mask="#.##"
            suffix="metros"
          />
        </q-form>
        <table-session v-if="!newBean" :id.sync="id" class="col w-100 h-100" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          :label="!newBean ? 'update' : 'save'"
          color="primary"
          unelevated
          dense
          size="md"
          @click="save"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script src="./PatientDialog.js" />

<style lang="scss" scoped></style>
