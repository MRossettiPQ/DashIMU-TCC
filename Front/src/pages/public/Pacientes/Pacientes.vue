<template>
  <section name="sensor" class="responsive-height">
    <div class="row responsive-content grid-tela">
      <div class="col" />
      <div class="col q-pa-md">
        <!--v-for="(paciente, index) in pacientes"-->
        <q-table
          title="Treats"
          :data="data"
          :columns="columns"
          row-key="id"
          :filter="filter"
          :loading="loading"
          @row-click="onRowClick"
        >
          <template #top>
            <q-btn
              color="primary"
              :disable="loading"
              label="Adicionar Paciente"
              @click="addRow"
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

        <q-dialog
          ref="formAdicionarPaciente"
          v-model="adicionarPaciente"
          full-width
          full-height
        >
          <q-card class="column full-height dialog-card">
            <q-card-section class="div-header">
              <div class="text-h6">Cadastrar novo paciente</div>
              <q-btn v-close-popup flat label="Fechar" />
            </q-card-section>
            <q-separator />
            <q-card-section class="col q-pt-none grid-cadastro">
              <q-form @submit="onSubmit(cadastro)">
                <q-input
                  v-model="cadastro.nomePaciente"
                  filled
                  label="Nome"
                  class="m-t-40"
                  :rules="[$validators.notBlank]"
                />
                <masked-input
                  v-model="cadastro.cpfPaciente"
                  filled
                  label="CPF"
                  class="m-t-40"
                  :rules="[$validators.notBlank, $validators.cpf]"
                  type="cpf"
                />
                <date-time-picker
                  v-model="cadastro.nascPaciente"
                  filled
                  label="Data de Nascimento"
                  class="m-t-8"
                  :rule="[dataNascimentoValidator, $validators.notBlank]"
                />
                <masked-input
                  v-model="cadastro.telefonePaciente"
                  filled
                  label="Telefone"
                  type="telefone"
                  class="m-t-40"
                  :rules="[$validators, $validators.telefone]"
                />
                <q-input
                  v-model="cadastro.emailPaciente"
                  filled
                  label="Email"
                  class="m-t-8"
                  type="email"
                  :rules="[$validators.notBlank, $validators.email]"
                />
                <masked-input
                  v-model="cadastro.alturaPaciente"
                  filled
                  label="Altura"
                  class="m-t-8"
                  type="money"
                  prefix="m"
                  :rules="[$validators.notBlank]"
                />
              </q-form>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn
                v-close-popup
                color="primary"
                label="cadastrar"
                class="cadastro-btn"
                size="lg"
                type="submit"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="perfilPaciente" full-width full-height>
          <q-card class="column full-height dialog-card">
            <q-card-section class="div-header">
              <div class="text-h6">Paciente:</div>
              <q-btn v-close-popup flat label="Fechar" />
            </q-card-section>
            <q-separator />
            <q-card-section class="col q-pt-none grid-conteudo">
              <div class="col">
                <q-form class="grid-perfil">
                  <div class="text-h6">Informações</div>
                  <q-field filled label="Nome" stack-label>
                    {{ perfilAberto.nomePaciente }}
                  </q-field>
                  <q-field filled label="E-mail" stack-label>
                    {{ perfilAberto.emailPaciente }}
                  </q-field>
                  <q-field filled label="CPF" stack-label>
                    {{ perfilAberto.cpfPaciente }}
                  </q-field>
                  <q-field filled label="TELEFONE" stack-label>
                    {{ perfilAberto.telefonePaciente }}
                  </q-field>
                  <q-field filled label="ALTURA" stack-label>
                    {{ perfilAberto.alturaPaciente }}
                  </q-field>
                </q-form>
              </div>
              <div class="col grid-medicao">
                <div class="text-h6">Medições</div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn
                v-close-popup
                flat
                label="Atualizar Perfil"
                @click="atualizarPerfil"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <div class="col" />
    </div>
  </section>
</template>

<script src="./Pacientes.js" />

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

.grid-perfil
  padding 16px
  height 100%
  width 100%
  display flex
  gap 16px
  flex-direction column

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

.div-header
  width 100%
  display flex
  justify-content space-between
</style>
