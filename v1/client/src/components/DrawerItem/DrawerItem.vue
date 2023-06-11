<template>
  <q-item class="inactive rounded-borders" active-class="active" exact-active-class="active" clickable @click="click">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script src="./DrawerItem.js" />

<style lang="scss" scoped>
.inactive {
  color: $primary;
}

.active {
  color: $secondary;
}
.q-item {
  border: solid 1px $primary;
}
</style>
