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
              v-for="(sensor, index) in sensores"
              :key="index"
              :content-class="sensor.dispositivo.corTab"
              :label="sensor.tab_label"
              :name="sensor.tab_name"
              icon="sensors"
            />
          </q-tabs>
        </q-card-section>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            v-for="(sensor, index) in sensores"
            :key="index"
            :name="sensor.tab_name"
          >
            <div class="text-h6">{{ sensor.label }}</div>
            <q-form>
              <div class="row form-lines form-lines__gap">
                <q-select
                  v-model="sensor.dispositivo.ip"
                  :options="sensoresDisponiveis"
                  emit-value
                  filled
                  label="Sensores disponiveis"
                  option-label="ip"
                  option-value="ip"
                />
                <q-input
                  v-model="sensor.dispositivo.ip"
                  :label="'IP Session ' + sensor.tab_label"
                  class="row"
                  filled
                  type="text"
                />

                <q-btn
                  v-if="!sensor.dispositivo.ativo"
                  :color="sensor.dispositivo.corBtn"
                  class="row"
                  label="Conectar"
                  size="lg"
                  unelevated
                  @click="conecta(index)"
                />

                <q-btn
                  v-if="sensor.dispositivo.ativo"
                  :color="sensor.dispositivo.corBtn"
                  class="row"
                  label="Desconectar"
                  size="lg"
                  unelevated
                  @click="desconecta(index)"
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
</style>
