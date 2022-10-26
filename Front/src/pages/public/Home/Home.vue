<template>
  <q-page class="home">
    <div class="column">Home</div>
    <div class="column" v-if="metadata !== null">
      <span>{{ metadata.socket_url }}</span>
    </div>
  </q-page>
</template>

<script src="./Home.js" />

<style lang="stylus" scoped>
.home
  display flex
  flex-direction column
  padding 16px
</style>
