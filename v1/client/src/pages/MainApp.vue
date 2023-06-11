<template>
  <q-layout view="lHh lpR lfr">
    <q-page-container class="full-height full-width">
      <q-header elevated>
        <q-toolbar>
          <q-btn
            aria-label="Menu"
            dense
            flat
            icon="menu"
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
          <q-toolbar-title>Dash-IMU</q-toolbar-title>

          <div>
            <q-toolbar-title>
              <div class="content">
                <q-icon name="ion-logo-github" size="14px" />
                <a href="https://github.com/MRossettiPQ/DashIMU-TCC" target="_blank"
                  >Matheus Rossetti</a
                >
              </div>
            </q-toolbar-title>
          </div>
        </q-toolbar>
      </q-header>

      <q-ajax-bar ref="loadingBar" position="top" color="green" size="6px" />

      <q-drawer
        ref="drawer"
        show-if-above
        :value="leftDrawerOpen"
        @hide="leftDrawerOpen = false"
        side="left"
        elevated
        bordered
        content-class="bg-grey-1 column justify-between no-wrap"
      >
        <q-img
          v-if="!!bean"
          clickable
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
          @click="goProfile"
        >
          <div class="absolute-bottom bg-transparent">
            <div class="text-weight-bold">{{ bean.name }}</div>
            <div>@{{ bean.username }}</div>
          </div>
        </q-img>

        <q-list separator>
          <menu-item v-for="(link, index) in essentialLinks" :key="index" :item="link" />
        </q-list>

        <div class="col-grow"></div>

        <q-list>
          <menu-item v-if="!!logged" :item="logout" @click="logOut()" />
        </q-list>
      </q-drawer>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script src="./MainApp.js" />

<style lang="scss" scoped>
a {
  padding-left: 5px;
  color: hsl(240, 9%, 89%);
  text-decoration: none;
  font-size: 14px;
}

.content {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
</style>
