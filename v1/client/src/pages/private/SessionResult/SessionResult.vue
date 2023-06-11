<template>
  <section class="responsive-height p-8">
    <q-card bordered flat class="column responsive-content p-8 h-100">
      <loading-screen v-if="fetchData.loading" />
      <error-screen v-else-if="fetchData.hasError" />
      <q-card-section v-else-if="!fetchData.isNull" class="column h-100 gap-8 w-100 p-0 no-wrap">
        <div class="result-grid gap-8 overflow-auto">
          <div class="tabs gap-4 overflow-auto">
            <q-btn
              v-for="(movement, index) in fetchData.result?.movements"
              :key="index"
              unelevated
              :text-color="tab !== `Mov_${movement.id}` ? 'primary' : ''"
              :color="tab === `Mov_${movement.id}` ? 'primary' : ''"
              :label="`Mov_${movement.id} `"
              icon="las la-running"
              @click="selectTab(`Mov_${movement.id}`)"
            />
          </div>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel
              v-for="(movement, index) in fetchData.result?.movements"
              :key="index"
              :name="'Mov_' + movement.id"
              class="p-0 w-100 h-100"
            >
              <movement-result :session-id="sessionId" :movement="movement" />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-card-section>
    </q-card>
  </section>
</template>

<script src="./SessionResult.js" />

<style lang="scss" scoped>
@import '~src/css/mixins.scss';
.result-grid {
  display: grid;
  grid-template-columns: min-content 1fr;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  @include md() {
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr;
  }
}
.tabs {
  display: flex;
  flex-direction: column;
  @include md() {
    flex-direction: row;
  }
}
</style>
