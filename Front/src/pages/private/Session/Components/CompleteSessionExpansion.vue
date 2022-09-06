<template>
  <div class="col">
    <q-expansion-item
      expand-separator
      icon="perm_identity"
      label="Complete session"
    >
      <q-form ref="refForm" greedy>
        <q-card>
          <q-card-section class="form-lines form-lines__gap patient-expansion">
            <q-input
              v-model="sessionBean.weight"
              :rules="[$validators.notBlank]"
              filled
              label="Weight"
              mask="##.##"
              suffix="Kg"
            />

            <q-btn
              class="col"
              color="primary"
              label="Save"
              size="md"
              unelevated
              @click="saveSession"
              :loading="loadingSave"
            />
          </q-card-section>
        </q-card>
      </q-form>
    </q-expansion-item>
  </div>
</template>

<script src="./CompleteSessionExpansion.js" />

<style lang="stylus" scoped>
.patient-expansion
  overflow-x hidden
</style>
