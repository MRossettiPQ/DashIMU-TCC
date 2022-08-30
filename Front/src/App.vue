<template>
  <div id="q-app">
    <div class="flex-shrink-1">
      <div class="container">
        <q-ajax-bar
          ref="loadingBar"
          position="top"
          color="primary"
          size="4px"
        />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script src="./App.js" />
