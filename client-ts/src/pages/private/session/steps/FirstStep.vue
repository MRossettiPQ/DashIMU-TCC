<template>
  <div class="h-100 w-100 flex column gap-4">
    <div class="row w-100">
      <q-btn
        dense
        unelevated
        color="primary"
        icon-right="add_circle"
        label="Adicionar procedimento"
        @click="syncSession.bean.addProcedure()"
      />
    </div>
    <div class="col w-100 scroll">
      <procedure
        v-for="(p, index) in syncSession.bean.procedures"
        :key="index"
        :procedure.sync="syncSession.bean.procedures[index]"
        :session.sync="syncSession"
        :order="index"
      />
    </div>
  </div>
</template>

<script src="./FirstStep.ts" lang="ts" />

<style lang="scss" scoped></style>
