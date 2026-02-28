import { LampCeiling } from 'lucide-vue-next';
import { computed, ref, storeToRefs, useGlobalStore, useWsNodeRedStore } from '#imports';
import { Page } from '~/core/entities/UI/Page';
import { PageItem } from '~/core/entities/UI/PageItem';
import { Panel } from '~/core/entities/UI/Panel';
import { getStaticFileUrl } from '~/services/static-files';

export function useLightsPanel() {
  const { dataWsNodeRed } = storeToRefs(useWsNodeRedStore());
  const globalStore = useGlobalStore();
  const panel = ref<Panel>(new Panel({ id: 'lights_panel', name: 'Lights', emoji: LampCeiling }));
  const { currentDisplayView } = storeToRefs(globalStore);
  async function setScene(name: any) {
    return $fetch('/api/node-red/desk-display-api', {
      query: {
        action: `set_lights_${name}`,
      },
    });
  }

  async function initPanel() {
    const rawItems = [
      {
        title: 'Work',
        onClick: () => setScene('desk_work'),
        backgroundImage: getStaticFileUrl('light_scene/work.png'),
      },
      {
        title: 'Edison',
        onClick: () => setScene('salon_edison'),
        backgroundImage: getStaticFileUrl('light_scene/edison.png'),
      },
      {
        title: 'Edison Lite',
        onClick: () => setScene('salon_edison_lite'),
        backgroundImage: getStaticFileUrl('light_scene/edison.png'),
      },
      {
        title: 'Salon Off',
        onClick: () => setScene('salon_off'),
        backgroundImage: getStaticFileUrl('light_scene/off.png'),
      },
      {
        title: 'Salon Red',
        onClick: () => setScene('salon_red'),
        backgroundImage: getStaticFileUrl('light_scene/red.png'),
      },
      {
        title: 'Salon Energize',
        onClick: () => setScene('salon_energize'),
        backgroundImage: 'unsplash-1663426242582-7c707af07128',
      },
      {
        title: 'Calm TV 1',
        onClick: () => setScene('salon_calm_tv_1'),
        backgroundImage: 'unsplash-1593305841991-05c297ba4575',
      },
      {
        title: 'Calm TV 2',
        onClick: () => setScene('salon_calm_tv_2'),
        backgroundImage: 'unsplash-1624115773145-9b77fe912897',
      },
      {
        title: 'Salon Miami',
        onClick: () => setScene('salon_miami'),
        backgroundImage: 'unsplash-1571534494457-af9aa81ca32b',
      },
      {
        title: 'Chambre',
        onClick: () => setScene('chambre_toggle'),
        backgroundImage: 'unsplash-1522771739844-6a9f6d5f14af',
        isBackgroundImageGray: computed(() => dataWsNodeRed.value?.main_sensors?.all_lights?.chambre === 0),
      },
    ].map((r) => new PageItem(r));

    panel.value.addPages(
      Page.generatePagesFromItems(rawItems, {
        pageRows: currentDisplayView.value === 'screen' ? 2 : 6,
        pageColumn: currentDisplayView.value === 'screen' ? 5 : 6,
      }),
    );
  }

  return {
    panel,
    initPanel,
  };
}
