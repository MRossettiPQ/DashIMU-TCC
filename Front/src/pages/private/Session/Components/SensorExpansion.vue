<template>
  <div class="col">
    <q-expansion-item expand-separator icon="sensor_window" label="Session">
      <q-card>
        <q-card-section>
          <q-tabs
            v-model="tab"
            active-color="primary"
            align="justify"
            class="text-grey"
            dense
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab
              icon="add"
              label="Sensor"
              name="maisSensor"
              @click="addSensor"
            />
            <q-tab
              v-for="(sensor, index) in sensors"
              :key="index"
              :content-class="sensor.device.corTab"
              :label="sensor.sensorName"
              :name="sensor.tab_name"
              icon="sensors"
            />
          </q-tabs>
        </q-card-section>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            v-for="(sensor, index) in sensors"
            :key="index"
            :name="sensor.tab_name"
          >
            <div class="title-header">
              <div class="text-h6">
                {{ sensor.label }}
              </div>
              <q-btn
                :loading="loading"
                flat
                icon="refresh"
                @click="listSensorsLoad"
              ></q-btn>
            </div>
            <q-form>
              <div class="row form-lines form-lines__gap">
                <q-select
                  v-show="!sensor.device.active"
                  v-model="sensor.device.ip"
                  :options="sensorsOptions"
                  emit-value
                  filled
                  label="Sensors available"
                  option-label="ip"
                  option-value="ip"
                />
                <q-input
                  :disable="sensor.device.active"
                  v-model="sensor.device.ip"
                  :label="'IP Sensor ' + sensor.tab_label"
                  class="row"
                  filled
                  type="text"
                />
                <q-btn
                  :disable="sensor.device.active"
                  v-if="!sensor.device.active"
                  :color="sensor.device.corBtn"
                  class="row"
                  label="Connect"
                  size="lg"
                  unelevated
                  @click="connect(index)"
                />

                <q-btn
                  v-show="sensor.device.active"
                  :color="sensor.device.corBtn"
                  class="row"
                  label="Disconnect"
                  size="lg"
                  unelevated
                  @click="disconnect(index)"
                />
              </div>
            </q-form>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script src="./SensorExpansion.js" />

<style lang="stylus" scoped>
.tabs-style
  overflow hidden
  overflow-x scroll

.title-header
  display flex
  align-items center
  justify-content space-between
  padding-top 8px
  padding-bottom 8px
</style>
