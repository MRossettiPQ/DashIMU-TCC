<template>
  <section class="responsive-height">
    <div class="row responsive-content p-8">
      <div v-if="logged" class="col form-lines gap-8">
        <h3 class="title-h3">Profile {{ user.name }}</h3>
        <q-form ref="mainForm" greedy>
          <q-card bordered flat class="form-column gap-8 p-8">
            <div class="form-lines gap-8">
              <q-input
                v-model="user.id"
                outlined
                dense
                label="Id do User"
                :readonly="readOnly"
                stack-label
              />
              <q-input
                v-model="user.name"
                outlined
                dense
                label="Nome"
                :readonly="readOnly"
                stack-label
              />
            </div>

            <div class="form-lines gap-8">
              <q-input
                v-model="user.email"
                outlined
                dense
                label="E-mail"
                :readonly="readOnly"
                stack-label
              />
              <q-input
                v-model="user.accessToken"
                outlined
                dense
                label="Token"
                :readonly="readOnly"
                stack-label
              />
            </div>
            <q-input
              v-model="user.role"
              outlined
              dense
              label="Funções do User"
              :readonly="readOnly"
              stack-label
            />
          </q-card>
        </q-form>
      </div>
    </div>
  </section>
</template>

<script src="./AccountPage.ts" lang="ts"/>

<style lang="scss" scoped>
//@import "src/css/mixins.scss";
//
//.form-column {
//  flex-direction: row;
//
//  @include mobile-portrait() {
//    padding: 16px;
//    gap: 16px;
//    flex-direction: column;
//  }
//}
//
//.form-lines {
//  @include mobile-portrait() {
//    padding: 0;
//  }
//}
</style>
