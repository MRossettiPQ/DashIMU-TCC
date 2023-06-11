<template>
  <q-card class="row w-100 justify-between p-8">
    <div v-if="id" class="text-h6">{{ idMsg }} {{ id }}</div>
    <div v-else class="text-h6">{{ elseMsg }}</div>
    <q-btn v-close-popup :icon="icon || 'close'" :label="labelRightButton" dense flat size="md" />
  </q-card>
</template>

<script src="./DialogHeader.js" />

<style lang="scss" scoped></style>
