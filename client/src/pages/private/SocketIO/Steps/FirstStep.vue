<template>
  <div class="h-100 w-100 flex column gap-4">
    <div class="row w-100">
      <q-btn
        dense
        color="primary"
        icon-right="add_circle"
        label="Adicionar procedimento"
        @click="syncSession.bean.addProcedure()"
      />
    </div>
    <div class="col w-100 scroll">
      <q-form
        ref="mainForm"
        class="flex column gap-8 p-r-4"
        greedy
      >
        <procedure
          v-for="(p, index) in syncSession.bean.procedures"
          :key="index"
          :procedure.sync="syncSession.bean.procedures[index]"
          :session.sync="syncSession"
          :order="index"
        />

      </q-form>
    </div>
  </div>
</template>

<script src="./FirstStep.js"/>

<style lang="scss" scoped>

</style>
