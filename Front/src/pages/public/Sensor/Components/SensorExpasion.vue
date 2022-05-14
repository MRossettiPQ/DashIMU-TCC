<template>
  <div class="column">
    <q-expansion-item
      expand-separator
      icon="sensor_window"
      label="Sensor"
    >
      <q-card>
        <q-card-section>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab
              v-for="(sensor, index) in sensores"
              :key="index"
              :name="sensor.tab_name"
              :label="sensor.tab_label"
              icon="sensors"
              :content-class="sensor.dispositivo.corTab"
            />
          </q-tabs>
        </q-card-section>

        <q-separator/>

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
                  filled
                  v-model="sensor.dispositivo.ip"
                  :options="sensoresDisponiveis"
                  option-value="ip"
                  option-label="ip"
                  emit-value
                  label="Sensores disponiveis"
                />
                <q-input
                  class="row"
                  v-model="sensor.dispositivo.ip"
                  filled
                  :label="'IP Sensor ' + sensor.tab_label"
                  type="text"
                />

                <q-btn
                  class="row"
                  v-if="!sensor.dispositivo.ativo"
                  :color="sensor.dispositivo.corBtn"
                  unelevated
                  label="Conectar"
                  size="lg"
                  @click="conecta(index)"
                />

                <q-btn
                  class="row"
                  v-if="sensor.dispositivo.ativo"
                  :color="sensor.dispositivo.corBtn"
                  unelevated
                  label="Desconectar"
                  size="lg"
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

<script src="./SensorExpasion.js" />

<style scoped>

</style>
