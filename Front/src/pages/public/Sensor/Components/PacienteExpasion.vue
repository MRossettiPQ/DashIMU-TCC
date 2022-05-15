<template>
  <div class="column">
    <q-expansion-item
      expand-separator
      icon="perm_identity"
      label="Paciente"
    >
      <q-card>
        <q-card-section class="form-lines form-lines__gap">
          <q-field filled label="Nome" stack-label color="black">
            {{ bean.nomePaciente }}
          </q-field>
          <q-field filled label="CPF" stack-label color="black">
            {{ bean.cpfPaciente }}
          </q-field>
          <q-field filled label="Telefone" stack-label color="black">
            {{ bean.telefonePaciente }}
          </q-field>
          <q-field
            filled
            label="Data de Nascimento"
            stack-label
            color="black"
          >
            {{ filterDate(bean.nascPaciente) }}
          </q-field>
          <q-field filled label="Email" stack-label color="black">
            {{ bean.emailPaciente }}
          </q-field>
          <q-field filled label="Telefone" stack-label color="black">
            {{ bean.telefonePaciente }}
          </q-field>
          <q-field filled label="Altura" stack-label color="black">
            {{ bean.alturaPaciente }}
          </q-field>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script src="./PacienteExpasion.js"/>

<style scoped>

</style>
