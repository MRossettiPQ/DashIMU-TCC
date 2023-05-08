<template>
  <q-dialog no-refocus ref="dialog" full-height full-width>
    <q-card class="column">
      <dialog-header :id="id" :label-right-button="!isMobile ? 'Close' : null" id-msg="Patient nº" else-msg="New patient" />
      <loading-screen v-if="fetchData.loading"></loading-screen>
      <error-screen v-else-if="fetchData.hasError"></error-screen>
      <q-card-section v-else-if="fetchData.result !== null" class="card-section w-100">
        <q-form ref="mainForm" class="col form-lines form-lines__gap-sm w-100" greedy>
          <q-input v-model="bean.name" :rules="[$validators.notBlank]" outlined dense label="Nome" />
          <q-input v-model="bean.cpf" :rules="[$validators.notBlank, $validators.cpf]" outlined dense label="CPF" mask="###.###.###-##" />
          <q-input v-if="false" v-model="bean.birthday" outlined dense :rules="[$validators.notBlank, $validators.dateBorn]" fill-mask="DD-MM-YYYY">
            <template #prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="bean.birthday" fill-mask="DD-MM-YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input v-model="bean.phone" :rules="[$validators.notBlank, $validators.telefone]" outlined dense label="Telefone" mask="(##) #####-####" />
          <q-input v-model="bean.email" :rules="[$validators.notBlank, $validators.email]" outlined dense label="Email" type="email" />
          <q-input v-model="bean.stature" :rules="[$validators.notBlank]" outlined dense label="Altura" mask="#.##" suffix="metros" />
        </q-form>
        <table-session v-if="id !== null" :id="id" class="col w-100" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn :label="id !== null ? 'update' : 'save'" color="primary" unelevated dense size="md" @click="save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script src="./Patient.js" />

<style lang="scss" scoped>
@import "~src/css/mixins.scss";

.card-section {
  display: flex;
  flex-direction: row !important;
  gap: 12px;

  @include mobile-portrait() {
    display: flex !important;
    flex-direction: column !important;
  }
}
</style>
