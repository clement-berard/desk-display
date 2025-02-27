<template>
  <Drawer :open="showDialogDebug" @update:open="open => showDialogDebug = open">
    <DrawerContent class="h-full">
      <DrawerHeader>
        <div class="text-xl font-bold">Settings</div>
      </DrawerHeader>
      <div class="p-4 h-[400px] overflow-y-scroll">
        <template v-if="currentMainScreen === 'global'">
          <pre>Screen {{ resolution }}</pre>
          <Button @click="reloadPage">Reload</Button>
        </template>
        <template v-if="currentMainScreen === 'stores'">
            <pre>{{crush(globalStore.$state)}}</pre>
            <pre>{{crush(wsNodeRedStore.$state)}}</pre>
        </template>
      </div>
      <DrawerFooter class="h-24">
        <Tabs :default-value="currentMainScreen" class="h-full">
          <TabsList class="w-full h-full">
            <TabsTrigger value="global" @click="currentMainScreen = 'global'" class="h-full w-full">
              Global
            </TabsTrigger>
            <TabsTrigger value="stores" @click="currentMainScreen = 'stores'" class="h-full w-full">
              Stores
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
<script setup lang="ts">
import { crush } from 'radash';
import { onMounted } from 'vue';
import { Button } from '~/components/ui/button';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader } from '~/components/ui/drawer';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { useGlobalStore } from '~/stores/globalStore';
import { useWsNodeRedStore } from '~/stores/wsNodeRedStore';
import { ref, storeToRefs } from '#imports';
const currentMainScreen = ref('global');
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
</script>
