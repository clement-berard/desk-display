<template>
  <Drawer :open="showDialogDebug" @update:open="open => showDialogDebug = open">
    <DrawerContent class="h-full">
      <DrawerHeader>
        <DrawerTitle @click="showDialogDebug = false">Settings</DrawerTitle>

      </DrawerHeader>
      <div class="p-4">
        <Tabs default-value="global">
          <TabsList>
            <TabsTrigger value="global">
              Global
            </TabsTrigger>
            <TabsTrigger value="stores">
              Stores
            </TabsTrigger>
          </TabsList>
          <TabsContent value="global">
            <client-only>
              <pre>Screen {{ resolution }}</pre>
              <Button @click="reloadPage">Reload</Button>
            </client-only>
          </TabsContent>
          <TabsContent value="stores">
            <ScrollArea class="h-72 w-full">
            <pre>globalStore {{globalStore.$state}}</pre>
            <pre>wsNodeRedStore {{wsNodeRedStore.$state}}</pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>

      </div>
      <DrawerFooter>
        Footer
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { Button } from '~/components/ui/button';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '~/components/ui/drawer';
import { useGlobalStore } from '~/stores/globalStore';
import { useWsNodeRedStore } from '~/stores/wsNodeRedStore';

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
