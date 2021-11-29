<template>
  <section name="sensor" class="responsive-height">
    <div class="row responsive-content grid-tela">
      <div class="col" />
      <div class="col">
        <div class="col">
          <h1>Perfil de {{ currentUser.nomeUser }}</h1>
        </div>
        <div class="grid-conteudo">
          <div class="col flex">
            <strong>Nome:</strong>
            <p>{{ currentUser.nomeUser }}</p>
          </div>
          <div class="col flex">
            <strong>Data de Nascimento:</strong>
            <p>{{ currentUser.nascUser }}</p>
          </div>
          <div class="col flex">
            <strong>Telefone:</strong>
            <p>{{ currentUser.telefoneUser }}</p>
          </div>
          <div class="col flex">
            <strong>Email:</strong>
            <p>{{ currentUser.emailUser }}</p>
          </div>
          <div class="col flex">
            <strong>Id:</strong>
            <p>{{ currentUser.idUser }}</p>
          </div>
          <div class="col flex">
            <strong>Token:</strong>
            <p>
              {{ currentUser.accessToken.substring(0, 20) }} ...
              {{
                currentUser.accessToken.substr(
                  currentUser.accessToken.length - 20
                )
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="col" />
    </div>
  </section>
</template>

<script src="./Perfil.js" />

<style lang="stylus" scoped>
.grid-conteudo
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
