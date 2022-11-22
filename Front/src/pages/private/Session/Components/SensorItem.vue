<template>
  <q-item :class="connected ? 'item item__active' : 'item item__inactive'">
    <q-item-section class="col">
      <q-item-label>{{ sensor.nameSensor }}</q-item-label>
      <q-item-label caption>
        {{ sensor.ip }}
      </q-item-label>
    </q-item-section>
    <q-item-section class="col menu" style="margin-left: 0px !important">
      <q-btn
        dense
        flat
        icon="done"
        color="primary"
        @click="() => clickConnect()"
        :disable="connected"
        aria-label="Conectar"
      />
      <q-btn
        dense
        flat
        icon="close"
        color="primary"
        @click="() => clickDisconnect()"
        :disable="!connected"
      />
      <q-btn dense flat icon="more_vert" color="primary" :disable="!connected">
        <q-menu>
          <q-list class="column" style="min-width: 100px; gap: 6px">
            <q-btn
              v-for="(option, indexOption) in menu"
              :key="indexOption"
              dense
              flat
              :icon="option.icon"
              :label="option.label"
              color="primary"
              @click="() => option.action(sensorIndex)"
              :disable="!connected"
            />
          </q-list>
        </q-menu>
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script src="./SensorItem.js" />
<style lang="stylus" scoped>
.item{
  display: flex;
  flex-direction: row;
  gap: 6px;
  height: 160px

  .menu {
    display: flex;
    align-items: flex-end;
  }

  &__inactive {
    border-color: black;
    border-width: 1px;
    border-style: dashed;
    border-radius: 12px
  }
  &__active {
    border-color: $primary;
    border-width: 1px;
    border-style: solid;
    border-radius: 12px
  }
}
</style>
