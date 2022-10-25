<template>
  <div class="col" v-show="!loadingSensorList">
    <span>List of sensors</span>
    <q-select
      v-if="!!sensorListOptions.length"
      v-model="actual"
      :options="sensorListOptions"
      emit-value
      filled
      label="Sensors available"
      :option-label="(opt) => opt.sensor?.sensorName"
      :option-value="(opt) => opt.sensor"
    />

    <q-btn
      v-if="!!sensorListOptions.length"
      :disable="actual === null"
      color="primary"
      label="Add selected sensor"
      size="lg"
      @click="connect()"
    />

    <q-list>
      <q-slide-item
        @left="onLeft"
        @right="onRight"
        v-for="(sensor, index) in sensorListOptions"
        :key="`${sensor.sensorName}-${index}`"
      >
        <template #left>
          <q-icon name="done" />
        </template>
        <template #right>
          <q-icon name="alarm" />
        </template>

        <q-item clickable v-ripple>
          <q-item-section>Avatar-type icon</q-item-section>
          <q-item-section avatar>
            <q-avatar color="teal" text-color="white" icon="bluetooth" />
          </q-item-section>
        </q-item>
      </q-slide-item>
    </q-list>
  </div>
</template>

<script src="./SensorConnectionList.js" />

<style scoped></style>
