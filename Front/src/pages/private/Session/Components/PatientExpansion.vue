<template>
  <div class="column">
    <q-expansion-item expand-separator icon="perm_identity" label="Patient">
      <q-card>
        <q-card-section class="form-lines form-lines__gap">
          <q-field color="black" filled label="Nome" stack-label>
            {{ bean.nomePaciente }}
          </q-field>
          <q-field color="black" filled label="CPF" stack-label>
            {{ bean.cpfPaciente }}
          </q-field>
          <q-field color="black" filled label="Telefone" stack-label>
            {{ bean.telefonePaciente }}
          </q-field>
          <q-field color="black" filled label="Data de Nascimento" stack-label>
            {{ filterDate(bean.nascPaciente) }}
          </q-field>
          <q-field color="black" filled label="Email" stack-label>
            {{ bean.emailPaciente }}
          </q-field>
          <q-field color="black" filled label="Telefone" stack-label>
            {{ bean.telefonePaciente }}
          </q-field>
          <q-field color="black" filled label="Altura" stack-label>
            {{ bean.alturaPaciente }}
          </q-field>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script src="./PatientExpansion.js"/>

<style scoped></style>
