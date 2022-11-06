<template>
  <q-expansion-item
    class="expansion-item"
    expand-separator
    icon="perm_identity"
    label="Patient"
    group="group-to"
  >
    <q-card>
      <q-card-section class="form-lines form-lines__gap patient-expansion">
        <q-field color="black" filled label="Nome" stack-label>
          {{ bean.name }}
        </q-field>
        <q-field color="black" filled label="CPF" stack-label>
          {{ bean.cpf }}
        </q-field>
        <q-field color="black" filled label="Telefone" stack-label>
          {{ bean.phone }}
        </q-field>
        <q-field color="black" filled label="Data de Nascimento" stack-label>
          {{ filterDate(bean.birthday) }}
        </q-field>
        <q-field color="black" filled label="Email" stack-label>
          {{ bean.email }}
        </q-field>
        <q-field color="black" filled label="Altura" stack-label>
          {{ bean.stature }}
        </q-field>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script src="./PatientExpansion.js" />

<style lang="stylus" scoped>
@import "~src/css/mixins.styl"
.expansion-item {
  width: 303px;
  +mobile-portrait() {
    width: 100%;
  }
}
</style>
