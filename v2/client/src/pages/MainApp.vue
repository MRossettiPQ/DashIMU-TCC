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
          <q-toolbar-title> Dash-IMU</q-toolbar-title>

          <div>
            <q-toolbar-title>
              <div class="content">
                <q-icon name="ion-logo-github" size="14px" />
                <a
                  href="https://github.com/MRossettiPQ/DashIMU-TCC"
                  target="_blank"
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
          v-if="logged"
          clickable
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
          @click="goProfile"
        >
          <div class="absolute-bottom bg-transparent">
            <div class="text-weight-bold">{{ user.name }}</div>
            <div>@{{ user.username }}</div>
          </div>
        </q-img>

        <q-list separator>
          <menu-item
            v-for="link in menu"
            :key="link.title"
            v-bind="link"
            :logged="logged"
          />
        </q-list>

        <div class="col-grow"></div>

        <q-list>
          <q-item
            v-if="!!logged"
            clickable
            tag="a"
            @click="logOut"
            class="inactive"
            active-class="active"
            exact-active-class="active"
          >
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Logout</q-item-label>
              <q-item-label caption> Sair da conta</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" src="./MainApp.ts" />

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

.inactive {
  color: $primary;
}

.active {
  color: $secondary;
}
</style>
