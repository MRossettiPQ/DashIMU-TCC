<template>
  <q-item
    class="inactive"
    active-class="active"
    exact-active-class="active"
    clickable
    tag="a"
    @click="click"
    v-bind="attrs"
  >
    <q-item-section v-if="item.icon" avatar>
      <q-icon :name="item.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ item.title }}</q-item-label>
      <q-item-label caption>
        {{ item.caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script src="./MenuItem.js" />
<style lang="scss" scoped>
.inactive {
  color: $primary;
}

.active {
  color: $secondary;
}
</style>
