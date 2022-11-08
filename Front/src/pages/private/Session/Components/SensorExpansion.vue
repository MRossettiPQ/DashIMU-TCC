<template>
  <q-expansion-item
    class="expansion-item"
    expand-separator
    icon="sensor_window"
    :label="$t('session.sensors')"
    group="group-to"
  >
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
            v-for="(sensor, index) in syncedSensors"
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
          v-for="(sensor, index) in syncedSensors"
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
                v-if="sensorsOptions.length"
                v-show="!sensor.device.active"
                v-model="sensor.device.ip"
                :options="sensorsOptions"
                emit-value
                filled
                label="Sensors available"
                :option-label="
                  (i) =>
                    i?.ip
                      ? `${i?.nameSensor} - ${i?.ip} - ${
                          i.available ? ' - disponível' : ' - indisponível'
                        }`
                      : ''
                "
                option-value="ip"
              />
              <span v-else>{{ $t("session.no_sensor_available") }}</span>

              <q-select
                v-if="positions.length"
                v-model="sensor.position"
                :options="positions"
                emit-value
                filled
                label="Position"
                option-label="local"
                option-value="local"
              />

              <q-input
                :disable="sensor.device.active"
                v-model="sensor.device.ip"
                :label="'IP ' + sensor.sensorName"
                class="row"
                filled
                type="text"
              />

              <q-btn
                :disable="sensor.device.active || sensor.position === null"
                v-if="!sensor.device.active"
                :color="sensor.device.corBtn"
                class="row"
                label="Connect"
                size="lg"
                unelevated
                @click="connect(index)"
              />

              <q-btn
                v-if="false"
                v-show="sensor.device.active"
                :color="sensor.device.corBtn"
                class="row"
                label="Calibrate"
                size="lg"
                unelevated
                @click="calibrate(index)"
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

              <q-btn
                :color="sensor.device.corBtn"
                class="row"
                label="Remove"
                size="lg"
                unelevated
                @click="removeSensor(index)"
              />
            </div>
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-expansion-item>
</template>

<script src="./SensorExpansion.js" />

<style lang="stylus" scoped>
@import "~src/css/mixins.styl"
.title-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  padding-bottom: 8px;
}

.expansion-item {
  width: 303px;
  +mobile-portrait() {
    width: 100%;
  }
}
</style>
