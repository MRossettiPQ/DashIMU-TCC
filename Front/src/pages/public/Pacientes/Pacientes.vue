<template>
  <section name="sensor" class="responsive-height">
    <div class="row responsive-content grid-tela">
      <div class="col " />
      <div class="col q-pa-md">
        <q-table
          title="Treats"
          :data="data"
          :columns="columns"
          row-key="id"
          :filter="filter"
          :loading="loading"
          @row-click="onRowClick"
        >
          <template v-slot:top>
            <q-btn
              color="primary"
              :disable="loading"
              label="Adicionar Paciente"
              @click="addRow"
            />
            <q-space />
            <q-input
              borderless
              dense
              debounce="300"
              color="primary"
              v-model="filter"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>

        <q-dialog v-model="adicionarPaciente" full-width full-height>
          <q-card class="column full-height dialog-card">
            <q-card-section>
              <div class="text-h6">Cadastrar novo paciente</div>
            </q-card-section>
            <q-separator />
            <q-card-section class="col q-pt-none grid-cadastro">
              <q-form @submit="onSubmit(cadastro)">
                <q-input
                  filled
                  v-model="cadastro.nomePaciente"
                  label="Nome"
                  class="m-t-40"
                  :rules="[$validators.notBlank]"
                />
                <q-input
                  filled
                  v-model="cadastro.cpfPaciente"
                  label="CPF"
                  class="m-t-40"
                  :rules="[$validators.notBlank]"
                />
                <date-time-picker
                  filled
                  label="Data de Nascimento"
                  v-model="cadastro.nascPaciente"
                  class="m-t-8"
                  :rule="[dataNascimentoValidator, $validators.notBlank]"
                />
                <q-input
                  filled
                  v-model="cadastro.telefonePaciente"
                  label="Telefone"
                  class="m-t-40"
                  :rules="[$validators.notBlank]"
                />
                <q-input
                  filled
                  v-model="cadastro.emailPaciente"
                  label="Email"
                  class="m-t-8"
                  type="email"
                  :rules="[$validators.notBlank]"
                />
                <q-input
                  filled
                  v-model="cadastro.alturaPaciente"
                  label="Altura"
                  class="m-t-8"
                  type="text"
                  :rules="[$validators.notBlank]"
                />
                <q-btn
                  color="primary"
                  label="cadastrar-se"
                  class="cadastro-btn"
                  size="lg"
                  type="submit"
                />
              </q-form>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn flat label="Fechar" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="perfilPaciente" full-width full-height>
          <q-card class="column full-height dialog-card">
            <q-card-section>
              <div class="text-h6">Paciente:</div>
            </q-card-section>
            <q-separator />
            <q-card-section class="col q-pt-none grid-conteudo">
              <div class="col grid-perfil">
                <div class="col flex">
                  <strong>Nome:</strong>
                  <p>
                    {{ perfilAberto.nomePaciente }}
                  </p>
                </div>
                <div class="col flex">
                  <strong>E-MAIL:</strong>
                  <p>
                    {{ perfilAberto.emailPaciente }}
                  </p>
                </div>
                <div class="col flex">
                  <strong>CPF:</strong>
                  <p>
                    {{ perfilAberto.cpfPaciente }}
                  </p>
                </div>
                <div class="col flex">
                  <strong>TELEFONE:</strong>
                  <p>
                    {{ perfilAberto.telefonePaciente }}
                  </p>
                </div>
                <div class="col flex">
                  <strong>ALTURA:</strong>
                  <p>
                    {{ perfilAberto.alturaPaciente }}
                  </p>
                </div>
              </div>
              <div class="col">Lista de Medições</div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn flat label="Fechar" @click="resetPerfil" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <div class="col " />
    </div>
  </section>
</template>

<script src="./Pacientes.js" />

<style lang="stylus" scoped>
.dialog-card
  width 100vw
  height 100vh

.grid-cadastro
  padding-top 16px
  height 100%
  width 100%
  display grid

.grid-conteudo
  padding-top 16px
  height 100%
  width 100%
  display grid
  grid-template-columns 50% 50%

.grid-perfil
  width 100%
  display grid
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  justify-items flex-start

h1
  font-size 2rem
  padding 0
  margin 0

strong, p
  font-size 1.5em
</style>
