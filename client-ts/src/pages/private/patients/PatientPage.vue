<template>
  <q-dialog no-refocus ref="dialog" full-height full-width>
    <q-card class="column">
      <dialog-header
        :id="id"
        :label-right-button="!isMobile ? 'Close' : null"
        id-msg="Paciente nº"
        else-msg="Novo paciente"
      />
      <loading-screen v-if="fetchData.loading"/>
      <error-screen v-else-if="fetchData.hasError"/>
      <q-card-section v-else-if="!fetchData.isNull" class="form-column gap-8 h-100">
        <q-form ref="mainForm" class="col form-lines w-100" greedy>
          <q-input v-model="fetchData.result.name" :rules="[$rules.notBlank]" outlined dense label="Nome" />
          <q-input v-model="fetchData.result.cpf" :rules="[$rules.notBlank, $rules.cpf]" outlined dense label="CPF" mask="###.###.###-##" />
<!--          <q-input v-if="false" v-model="bean.birthday" outlined dense :rules="[$validators.notBlank]" fill-mask="DD-MM-YYYY">-->
<!--            <template #prepend>-->
<!--              <q-icon name="event" class="cursor-pointer">-->
<!--                <q-popup-proxy cover transition-show="scale" transition-hide="scale">-->
<!--                  <q-date v-model="bean.birthday" fill-mask="DD-MM-YYYY">-->
<!--                    <div class="row items-center justify-end">-->
<!--                      <q-btn v-close-popup label="Close" color="primary" flat />-->
<!--                    </div>-->
<!--                  </q-date>-->
<!--                </q-popup-proxy>-->
<!--              </q-icon>-->
<!--            </template>-->
<!--          </q-input>-->
          <q-input v-model="fetchData.result.phone" :rules="[$rules.notBlank, $rules.telefone]" outlined dense label="Telefone" mask="(##) #####-####" />
          <q-input v-model="fetchData.result.email" :rules="[$rules.notBlank, $rules.email]" outlined dense label="Email" type="email" />
          <q-input v-model="fetchData.result.stature" :rules="[$rules.notBlank]" outlined dense label="Altura" mask="#.##" suffix="metros" />
        </q-form>
        <table-session  v-if="!newBean" :id.sync="id" class="col w-100 h-100" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn :label="!newBean ? 'update' : 'save'" color="primary" unelevated dense size="md" @click="save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script src="./PatientPage.ts" lang="ts" />

<style lang="scss" scoped>
@import "src/css/mixins.scss";

//.card-section {
//  display: flex;
//  flex-direction: row !important;
//  gap: 12px;
//
//  @include mobile-portrait() {
//    display: flex !important;
//    flex-direction: column !important;
//  }
//}
</style>
