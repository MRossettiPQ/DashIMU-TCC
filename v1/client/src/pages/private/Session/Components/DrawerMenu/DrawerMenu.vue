<template>
  <div class="p-12 column gap-12 overflow-auto no-wrap">
    <q-btn
      dense
      outline
      class="row icon-primary"
      label="Medições"
      icon="add"
      @click="connection.addTestReading()"
    />
    <div v-if="!!syncedSession.values.movements[0]?.type">
      <span class="f-bold"> Movimento atual </span>
      <q-select
        v-model="syncedSession.running_movement"
        :options="syncedSession.addedMovements"
        dense
        outlined
        label="Procedimento atual"
        option-label="label"
        option-value="index"
        @input="(value) => select(value)"
      />
    </div>
    <span class="f-bold" v-if="syncedSession.values.movements.length"> Movimentos </span>
    <div class="column gap-4 overflow-auto no-wrap">
      <drawer-movement
        v-for="(movement, index) in syncedSession.values.movements"
        :key="index"
        :movement="movement"
      />
    </div>
  </div>
</template>

<script src="./DrawerMenu.js" />

<style lang="scss" scoped></style>
