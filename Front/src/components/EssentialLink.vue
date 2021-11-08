<template>
  <q-item v-if="logged" clickable tag="a" v-bind="attrs">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon"/>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script src="./EssentialLink.js"/>
