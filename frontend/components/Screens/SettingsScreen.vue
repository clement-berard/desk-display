<template>
  <Drawer :open="showDialogDebug" @update:open="open => showDialogDebug = open">
    <DrawerContent class="h-screen">
      <div class="h-[80%] overflow-y-scroll">
        <DrawerHeader>
          <div class="text-xl font-bold">Settings</div>
        </DrawerHeader>
        <div class="p-4">
          <template v-if="currentMainScreen === 'global'">
            <button @click="reloadPage" class="mb-4 rounded-none">Reload</button>
            <table>
              <TableBody>
                <TableRow v-for="(tableRow, index) in tableBodyRows" :key="index">
                  <TableCell class="font-medium w-[15%]">{{tableRow.label}}</TableCell>
                  <TableCell>{{tableRow.value}}</TableCell>
                </TableRow>
              </TableBody>
            </table>
          </template>
          <template v-if="currentMainScreen === 'stores'">
            <pre>{{crush(globalStore.$state)}}</pre>
            <pre>{{crush(wsNodeRedStore.$state)}}</pre>
          </template>
        </div>
      </div>
      <DrawerFooter class="h-[20%]">
        <Tabs :default-value="currentMainScreen" class="h-full">
          <TabsList class="w-full h-full">
            <TabsTrigger value="global" @click="currentMainScreen = 'global'" class="h-full w-full">Global</TabsTrigger>
            <TabsTrigger value="stores" @click="currentMainScreen = 'stores'" class="h-full w-full">Stores</TabsTrigger>
          </TabsList>
        </Tabs>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
<script setup lang="ts">
import { crush } from 'radash';
import { onMounted } from 'vue';
import { computed, ref, storeToRefs } from '#imports';
import { Button } from '~/components/ui/button';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader } from '~/components/ui/drawer';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { useGlobalStore } from '~/stores/globalStore';
import { useWsNodeRedStore } from '~/stores/wsNodeRedStore';

const currentMainScreen = ref('global');

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

let resolution = {
  available: '',
  real: '',
};

const globalStore = useGlobalStore();
const wsNodeRedStore = useWsNodeRedStore();

const { showDialogDebug } = storeToRefs(globalStore);

onMounted(() => {
  resolution.available = `${window.screen.availWidth}x${window.screen.availHeight}`;
  resolution.real = `${window.screen.width}x${window.screen.height}`;
});

function reloadPage() {
  location.reload();
  showDialogDebug.value = false;
}

const tableBodyRows = computed(() => [
  {
    label: 'Screen Resolution (available)',
    value: resolution.available,
  },
  {
    label: 'Screen Resolution (real)',
    value: resolution.real,
  },
]);
</script>
