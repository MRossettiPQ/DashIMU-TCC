<template>
  <section class="responsive-height">
    <loading-screen v-if="fetchData.loading" />
    <error-screen v-else-if="fetchData.hasError" />
    <div v-else-if="fetchData.result !== null" class="column responsive-content div-session h-100 w-100">
      <stepper-header
        :navigation="navigation"
        :session.sync="session"
        :session-connection="sessionConnection"
        :is-tiny-screen="isTinyScreen"
        :patient="fetchData.result.patient"
        :fetch-result="fetchResult"
        :save-result="saveResult"
        :in-dev="inDev"
        class="row"
      />

      <transition class="row overflow-hidden" name="slide-fade" mode="out-in">
        <Component
          :is="navigation.actualStepValue"
          :session-connection="sessionConnection"
          :fetch-result="fetchResult"
          :session.sync="session"
          :is-tiny-screen="isTinyScreen"
          :loading-save="loadingSave"
          :save-result="saveResult"
          :in-dev="inDev"
        />
      </transition>

      <stepper-footer
        :navigation="navigation"
        :session-connection="sessionConnection"
        :session.sync="session"
        :loading-save="loadingSave"
        :is-tiny-screen="isTinyScreen"
        class="row"
        @save="saveSession"
      />
    </div>
  </section>
</template>

<script src="./Session.js" />

<style lang="scss" scoped>
@import "~src/css/mixins.scss";

.div-session {
  display: grid;
  grid-template-rows: minmax(62px, min-content) 1fr minmax(39px, min-content);
  height: 100%;
  padding: 16px;
  max-height: 100%;
  gap: 8px;
  @include mobile-portrait() {
    padding: 8px;
  }
}
</style>
