<template>
  <div>
    <span>Loading</span>
    <q-btn label="initEngineIo" @click="initEngineIo"></q-btn>
    <q-btn label="sendMessage" @click="sendMessage"></q-btn>
    <span>{{ message }}</span>
  </div>
</template>

<script src="./SocketTest.js" />
