<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { getIconUrlFromState } from '~/services/weather/weather.services';
import { useWsNodeRedStore } from '~/stores/wsNodeRedStore';

const wsNodeRedStore = useWsNodeRedStore();

const { dataWsNodeRed } = storeToRefs(wsNodeRedStore);
</script>

<template>
  <div class="text-center">
    <img
      :src="getIconUrlFromState(dataWsNodeRed?.main_sensors?.weather?.state as string)"
      alt="weather-icon"
      class="w-[50%] inline-block"
    >
    <div class="text-6xl font-bold">{{ dataWsNodeRed?.main_sensors?.sensor?.sensor_temp_balcon_temperature }}°C</div>
    <div class="text-center" v-if="dataWsNodeRed?.main_sensors?.weather?.alert?.wind">
      <img alt="" :src="getIconUrlFromState('windsock')" class="w-[50%] inline-block">
    </div>
  </div>
</template>
