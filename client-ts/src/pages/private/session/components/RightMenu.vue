<template>
  <q-form ref="mainForm" class="column gap-12 p-16 command-menu" greedy>
    <div class="column gap-8 form-lines">
      <span class="text-weight-bold"> Opções do gráfico</span>
      <drawer-item
        :title="
          !syncSession.smooth ? 'Arredondar gráfico' : 'Não arredondar gráfico'
        "
        caption="Smooth mode"
        icon="las la-chart-line"
        @click="syncSession.toggleSmooth()"
      />
      <drawer-item
        title="Exportar CSV"
        caption="Todos os procedimentos"
        icon="las la-file-archive"
        @click="syncSession.export()"
      />
      <drawer-item
        v-if="inDev"
        title="Exportar JSON"
        caption="Exportar sessão"
        icon="las la-file-archive"
        @click="syncSession.exportJSON()"
      />
      <drawer-item
        v-if="inDev"
        title="Adicionar medições"
        caption="Para desenvolvimento"
        icon="las la-plus-circle"
        @click="syncSession.sockets.devSensor()"
      />
      <!--      <drawer-item-->
      <!--        title="Extrair imagem"-->
      <!--        caption="Imagem atual do gráfico"-->
      <!--        icon="las la-file-download"-->
      <!--        @click="syncSession.sockets.devSensor()"-->
      <!--      />-->
    </div>
    <!--      <q-select-->
    <!--        v-model="syncSession.running_movement"-->
    <!--        class="col"-->
    <!--        :options="syncSession.sockets.registeredSensorsList"-->
    <!--        dense-->
    <!--        label="Procedimento atual"-->
    <!--        :rules="[$rules.notBlank]"-->
    <!--        option-label="label"-->
    <!--        option-value="index"-->
    <!--      />-->
    <div class="column gap-8 form-lines">
      <span class="text-weight-bold"> Informações da sessão</span>
      <drawer-item
        title="Resumo"
        caption="Resumo das medições"
        icon="las la-tools"
        @click="checkMeasurement()"
      />
    </div>
  </q-form>
</template>

<script src="./RightMenu.ts" lang="ts" />

<style lang="scss" scoped></style>
