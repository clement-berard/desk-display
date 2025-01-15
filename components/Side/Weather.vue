<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useWsNodeRedStore } from '~/stores/wsNodeRedStore';

const wsNodeRedStore = useWsNodeRedStore();

const { dataWsNodeRed } = storeToRefs(wsNodeRedStore);

const getFullUrl = (name = '') => `https://basmilius.github.io/weather-icons/production/fill/all/${name}.svg`;

const matcherUrls = {
  partlycloudy: 'partly-cloudy-day',
  sunny: 'clear-day',
  rainy: 'rain',
};

const getWeatherUrl = computed(() => {
  const currentState = dataWsNodeRed?.value['main_sensors']?.['weather.state'];
  // @ts-ignore
  const nameMatch = matcherUrls?.[currentState] || currentState;

  return getFullUrl(nameMatch);
});
</script>

<template>
  <div class="text-center">
    <img :src="getWeatherUrl" alt="weather-icon" class="w-[50%] inline-block">
    <div class="text-xl">
      {{dataWsNodeRed?.main_sensors?.["sensor.sensor_temp_balcon_temperature"]}} °C
    </div>
    <div>
      {{dataWsNodeRed?.main_sensors?.["weather.state"]}}
    </div>
  </div>
</template>

