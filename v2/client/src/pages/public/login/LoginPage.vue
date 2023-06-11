<template>
  <q-page class="flex w-100 items-center justify-center">
    <q-card class="access-card" flat>
      <q-form ref="mainForm" class="col" greedy>
        <q-card-section class="form-lines form-lines__gap-sm">
          <div class="items-center">
            <h3 class="title-h3 col">{{ $t("login.page_tile") }}</h3>
          </div>

          <q-input v-model="bean.username" :rules="[$rules.notBlank]" outlined :label="$t('login.username')" type="text" />

          <q-input v-model="bean.password" :rules="[$rules.notBlank]" outlined :label="$t('login.password')" type="password" />

          <q-btn color="primary" :label="$t('login.login')" size="lg" unelevated @click="onSubmit" :loading="loading" />

          <p class="access-p">
            {{ $t("login.dont_have_an_account") }}
            <router-link to="register">
              {{ $t("login.to_register") }}
            </router-link>
          </p>
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script src="./LoginPage.ts" lang="ts" />

<style lang="scss" scoped></style>
