import { Blocks } from 'lucide-vue-next';
import { computed, ref, storeToRefs, useGlobalStore, useWsNodeRedStore } from '#imports';
import { Page } from '~/core/Domain/UI/Page';
import { PageItem } from '~/core/Domain/UI/PageItem';
import { Panel } from '~/core/Domain/UI/Panel';

export function useMiscPanel() {
  const globalStore = useGlobalStore();
  const { dataWsNodeRed } = storeToRefs(useWsNodeRedStore());
  const { currentDisplayView } = storeToRefs(globalStore);
  const panel = ref<Panel>(new Panel({ id: 'misc_panel', name: 'Misc', emoji: Blocks }));

  async function callHaService(path: string, entityId: string) {
    return $fetch('/api/ha/services', {
      method: 'POST',
      query: {
        path,
        entityId,
      },
    });
  }

  async function initPanel() {
    panel.value.isLoading = true;

    const rawItems = [
      {
        title: 'Fan Xiaomi',
        onClick: () => callHaService('fan/toggle', 'fan.xiaomi_smart_fan'),
        backgroundImage: 'unsplash-1582558006297-f996ed8adfec',
        isBackgroundImageGray: computed(
          () => !dataWsNodeRed.value?.main_sensors?.all_main_information?.['fan_xiaomi.power'],
        ),
      },
      {
        title: '3D Power',
        onClick: () => callHaService('homeassistant/toggle', 'switch.prise_3d_printer'),
        backgroundImage: 'http://local-static.home/misc/p1s.jpg',
        isBackgroundImageGray: computed(
          () => !dataWsNodeRed.value?.main_sensors?.all_main_information?.['3d_printer.prise'],
        ),
      },
      {
        title: '3D Light',
        onClick: () => callHaService('light/toggle', 'light.p1s_01p00c542401101_lumiere_de_la_chambre'),
        backgroundImage: 'unsplash-1705475092160-d2b197d2570b',
        isBackgroundImageGray: computed(
          () => !dataWsNodeRed.value?.main_sensors?.all_main_information?.['3d_printer.light'],
        ),
      },
    ].map((r) => new PageItem(r));

    panel.value.addPages(
      Page.generatePagesFromItems(rawItems, {
        pageRows: currentDisplayView.value === 'screen' ? 2 : 6,
        pageColumn: currentDisplayView.value === 'screen' ? 5 : 6,
      }),
    );

    panel.value.isLoading = false;
  }

  return {
    panel,
    initPanel,
  };
}
