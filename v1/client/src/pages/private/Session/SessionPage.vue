<template>
  <section class="responsive-height">
    <loading-screen v-if="fetchData.loading" />
    <error-screen v-else-if="fetchData.hasError" />
    <div v-else-if="fetchData.hasResult" class="column responsive-content div-session h-100 w-100">
      <stepper-header
        :navigation="navigation"
        :session.sync="session"
        :connection.sync="connection"
        :menu-ref="menuRef"
        class="row"
      />

      <div class="column h-100 w-100 overflow-auto">
        <q-drawer
          ref="menuRef"
          bordered
          :value="rightDrawer"
          side="right"
          @hide="rightDrawer = false"
          content-class="bg-grey-1 column justify-between no-wrap"
        >
          <drawer-menu :session.sync="session" :connection.sync="connection" />
        </q-drawer>
        <transition class="h-100 w-100" name="slide-fade" mode="out-in">
          <Component
            :is="navigation.actualStepValue"
            :connection.sync="connection"
            :session.sync="session"
            :loading-save="loadingSave"
          />
        </transition>
      </div>

      <stepper-footer
        :navigation="navigation"
        :connection.sync="connection"
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
