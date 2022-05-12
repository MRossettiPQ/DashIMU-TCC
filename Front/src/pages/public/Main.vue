<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-header elevated>
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />

          <q-toolbar-title> Dashi-IMU</q-toolbar-title>

          <div>
            <q-toolbar-title>
              <div class="conteudo">
                <q-icon name="ion-logo-github" size="14px"/>
                <a href="https://github.com/MRossettiPQ/DashIMU-TCC" target="_blank"
                >Matheus Rossetti</a>
              </div>
            </q-toolbar-title>
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        content-class="bg-grey-1"
      >
        <q-img
          v-if="!!bean"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
          clickable
          @click="goPerfil"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png"/>
            </q-avatar>
            <div class="text-weight-bold">{{ bean.nomeUsuario }}</div>
            <div>@{{ bean.usernameUsuario }}</div>
          </div>
        </q-img>

        <q-list>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />

          <q-item v-if="!!logged" clickable tag="a" @click="logOut">
            <q-item-section avatar>
              <q-icon name="logout"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>Logout</q-item-label>
              <q-item-label caption> Sair da conta</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <div>
        <router-view/>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script src="./Main.js"/>

<style lang="stylus" scoped>

.conteudo-toolbar
  display flex
  flex-wrap nowrap
  align-items center

a
  padding-left 5px
  color hsl(240, 9%, 89%)
  text-decoration none
  font-size 14px

.conteudo
  display flex
  flex-wrap nowrap
  align-items center
</style>
