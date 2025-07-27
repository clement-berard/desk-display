import { ref, storeToRefs, useGlobalStore } from '#imports';
import { Page } from '~/core/Domain/UI/Page';
import { PageItem } from '~/core/Domain/UI/PageItem';
import { Panel } from '~/core/Domain/UI/Panel';

export function useMiscPanel() {
  const globalStore = useGlobalStore();
  const { currentDisplayView } = storeToRefs(globalStore);
  const panel = ref<Panel>(new Panel({ id: 'misc_panel', name: 'Misc', emoji: '🪭' }));

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
        title: 'Fan',
        onClick: () => callHaService('fan/toggle', 'fan.xiaomi_smart_fan'),
        backgroundImage: 'unsplash-1582558006297-f996ed8adfec',
      },
      {
        title: '3D Light',
        onClick: () => callHaService('light/toggle', 'light.p1s_01p00c542401101_lumiere_de_la_chambre'),
        backgroundImage: 'unsplash-1705475092160-d2b197d2570b',
      },
    ].map((r) => new PageItem(r));

    panel.value.addPages(
      Page.generatePagesFromItems(rawItems, {
        pageRows: currentDisplayView.value === 'screen' ? 2 : 10,
        pageColumn: currentDisplayView.value === 'screen' ? 5 : 10,
      }),
    );

    panel.value.isLoading = false;
  }

  return {
    panel,
    initPanel,
  };
}
