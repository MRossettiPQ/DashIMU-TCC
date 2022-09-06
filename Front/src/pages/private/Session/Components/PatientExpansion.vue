<template>
  <div class="col">
    <q-expansion-item expand-separator icon="perm_identity" label="Patient">
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
  </div>
</template>

<script src="./PatientExpansion.js" />

<style lang="stylus" scoped>
.patient-expansion
  overflow-x hidden
</style>
