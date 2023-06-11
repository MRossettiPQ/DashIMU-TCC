<template>
  <section class="responsive-height">
    <loading-screen v-if="fetchData.loading" />
    <error-screen v-else-if="fetchData.hasError" />
    <div v-else-if="fetchData.hasResult" class="column responsive-content div-session h-100 w-100">
      <stepper-header
        :navigation="navigation"
        :session.sync="session"
        :session-connection="sessionConnection"
        :patient="fetchData.result.patient"
        class="row"
      />

      <transition class="row h-100 w-100" name="slide-fade" mode="out-in">
        <Component
          :is="navigation.actualStepValue"
          :session-connection="sessionConnection"
          :session.sync="session"
          :loading-save="loadingSave"
          :save-result="saveResult"
        />
      </transition>

      <stepper-footer
        :navigation="navigation"
        :session-connection="sessionConnection"
        :session.sync="session"
        :loading-save="loadingSave"
        class="row"
        @save="saveSession"
      />
    </div>
  </section>
</template>

<script src="./SessionPage.js" />

<style lang="scss" scoped>
@import '~src/css/mixins.scss';

.div-session {
  display: grid;
  grid-template-rows: minmax(39px, min-content) 1fr minmax(39px, min-content);
  height: 100%;
  padding: 16px;
  max-height: 100%;
  gap: 8px;
  @include mobile-portrait() {
    padding: 8px;
  }
}
</style>
