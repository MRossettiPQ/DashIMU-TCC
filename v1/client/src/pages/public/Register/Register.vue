<template>
  <q-page class="flex w-100 items-center justify-center">
    <q-card class="access-card" flat>
      <q-form ref="mainForm" class="form-lines form-lines__gap-md" greedy>
        <div class="items-center">
          <h3 class="title-h3 col">{{ $t('register.page_tile') }}</h3>
        </div>
        <q-input
          v-model="bean.name"
          :rules="[$validators.notBlank]"
          outlined
          :label="$t('register.name')"
        />
        <q-input
          v-model="bean.username"
          :rules="[$validators.notBlank]"
          outlined
          :label="$t('register.user_name')"
        />
        <q-input
          v-model="bean.email"
          :rules="[$validators.notBlank, $validators.email]"
          outlined
          :label="$t('register.email')"
          type="email"
        />
        <q-input
          v-model="bean.password"
          :rules="[$validators.notBlank]"
          outlined
          :label="$t('register.password')"
          type="password"
        />
        <q-input
          v-model="bean.passwordConfirm"
          :rules="[$validators.notBlank, $validators.equal(bean.password)]"
          outlined
          :label="$t('register.repeat_password')"
          type="password"
        />
        <q-btn
          color="primary"
          :label="$t('register.register')"
          size="lg"
          @click="onSubmit"
          :loading="loading"
        />
      </q-form>
      <p class="access-p">
        {{ $t('register.already_have_an_account') }}
        <router-link to="login">{{ $t('register.to_login') }}</router-link>
      </p>
    </q-card>
  </q-page>
</template>

<script src="./Register.js" />

<style lang="scss" scoped></style>
