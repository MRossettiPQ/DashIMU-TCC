<template>
  <section name="sensor" class="responsive-height">
    <div class="row responsive-content grid-tela">
      <div class="col" />
      <div class="col">
        <div class="grid-conteudo">
          <h1>Perfil de {{ currentUser.nomeUser }}</h1>
          <q-field filled label="Nome" stack-label>
            {{ currentUser.nomeUser }}
          </q-field>
          <q-field filled label="Data de Nascimento" stack-label>
            {{ currentUser.nascUser }}
          </q-field>
          <q-field filled label="Telefone" stack-label>
            {{ currentUser.telefoneUser }}
          </q-field>
          <q-field filled label="Email" stack-label>
            {{ currentUser.emailUser }}
          </q-field>
          <q-field filled label="Id" stack-label>
            {{ currentUser.idUser }}
          </q-field>
          <q-field filled label="Tokenn" stack-label>
            {{ currentUser.accessToken.substring(0, 20) }} ...
            {{
              currentUser.accessToken.substr(
                currentUser.accessToken.length - 20
              )
            }}
          </q-field>
        </div>
      </div>
      <div class="col" />
    </div>
  </section>
</template>

<script src="./Perfil.js" />

<style lang="stylus" scoped>
.grid-conteudo
  padding 16px
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
