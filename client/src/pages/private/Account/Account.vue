<template>
  <section class="responsive-height">
    <div class="row responsive-content form-column p-16">
      <div v-if="bean !== null" class="col form-lines form-lines__gap-sm">
        <h3 class="title-h3">Profile {{ bean.name }}</h3>
        <q-form ref="mainForm" greedy>
          <q-card bordered class="form-column form-column__padding-sm" flat>
            <div class="col form-lines form-lines__padding-sm form-lines__gap-md">
              <q-input v-model="bean.id" class="col" outlined dense label="Id do User" :readonly="readOnly" stack-label />
              <q-input v-model="bean.name" class="col" outlined dense label="Nome" :readonly="readOnly" stack-label />
            </div>

            <div class="col form-lines form-lines__padding-sm form-lines__gap-md">
              <q-input v-model="bean.email" class="col" outlined dense label="E-mail" :readonly="readOnly" stack-label />
              <q-input v-model="bean.accessToken" class="col" outlined dense label="Token" :readonly="readOnly" stack-label />
            </div>

            <div class="col form-lines form-lines__padding-sm form-lines__gap-md">
              <q-input v-model="bean.role" class="col" outlined dense label="Funções do User" :readonly="readOnly" stack-label />
            </div>
          </q-card>
        </q-form>
      </div>
    </div>
  </section>
</template>

<script src="./Account.js" />

<style lang="scss" scoped>
@import "~src/css/mixins.scss";

.form-column {
  flex-direction: row;

  @include mobile-portrait() {
    padding: 16px;
    gap: 16px;
    flex-direction: column;
  }
}

.form-lines {
  @include mobile-portrait() {
    padding: 0;
  }
}
</style>
