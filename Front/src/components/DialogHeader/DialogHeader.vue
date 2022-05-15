<template>
  <q-card-section class="div-header">
    <div class="text-h6" v-if="id">{{ idMsg }} {{ id }}</div>
    <div class="text-h6" v-else>{{ elseMsg }}</div>
    <q-btn
      v-close-popup
      size="md"
      dense
      flat
      :icon="icon || 'close'"
      :label="labelRightButton"
    />
  </q-card-section>
</template>

<script src="./DialogHeader.js"/>

<style lang="stylus" scoped>
.dialog-header
  width 100%
  display flex

</style>
