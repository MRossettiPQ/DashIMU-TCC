<template>
  <div>
    <span>Loading</span>
    <q-btn @click="initEngineIo" label="initEngineIo"></q-btn>
    <q-btn @click="sendMessage" label="sendMessage"></q-btn>
    <span>{{ message }}</span>
  </div>
</template>

<script src="./SocketTest.js" />

<style scoped></style>
