<template>
  <q-dialog ref="dialog" full-height full-width>
    <q-card class="column">
      <dialog-header
        :id="id"
        :label-right-button="!$q.platform.is.mobile ? 'Close' : null"
        id-msg="Patient nº"
        else-msg="New patient"
      />
      <q-card-section
        :class="
          $q.platform.is.mobile
            ? 'col form-lines form-lines__gap'
            : 'col form-column form-column__gap'
        "
      >
        <q-form ref="mainForm" class="col form-lines form-lines__gap-sm" greedy>
          <q-input
            v-model="bean.name"
            :rules="[$validators.notBlank]"
            filled
            label="Nome"
          />
          <q-input
            v-model="bean.cpf"
            :rules="[$validators.notBlank, $validators.cpf]"
            filled
            label="CPF"
            mask="###.###.###-##"
          />
          <q-input
            filled
            v-model="bean.birthday"
            :rules="[$validators.notBlank, $validators.dateBorn]"
            fill-mask="DD-MM-YYYY"
          >
            <template #prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="bean.birthday" fill-mask="DD-MM-YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            v-model="bean.phone"
            :rules="[$validators.notBlank, $validators.telefone]"
            filled
            label="Telefone"
            mask="(##) #####-####"
          />
          <q-input
            v-model="bean.email"
            :rules="[$validators.notBlank, $validators.email]"
            filled
            label="Email"
            type="email"
          />
          <q-input
            v-model="bean.stature"
            :rules="[$validators.notBlank]"
            filled
            label="Altura"
            mask="#.##"
            suffix="metros"
          />
        </q-form>
        <table-session :id="id" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          :label="id !== null ? 'update' : 'save'"
          color="primary"
          dense
          size="md"
          @click="save"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script src="./Patient.js" />

<style lang="stylus" scoped></style>
