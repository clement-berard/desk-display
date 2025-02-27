import { Page } from '~/core/Domain/UI/Page';
import { PageItem } from '~/core/Domain/UI/PageItem';
import { Panel } from '~/core/Domain/UI/Panel';
import { computed, ref, storeToRefs, useFetch, useWsNodeRedStore } from '#imports';

export function useLightsPanel() {
  const { dataWsNodeRed } = storeToRefs(useWsNodeRedStore());
  const panel = ref<Panel>(new Panel({ id: 'lights_panel', name: 'Lights' }));

  async function setScene(name: any) {
    return useFetch('/api/node-red/desk-display-api', {
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
        backgroundImage: 'unsplash-1486312338219-ce68d2c6f44d',
      },
      {
        title: 'Salon Edison',
        onClick: () => setScene('salon_edison'),
        backgroundImage: 'unsplash-1458172594959-b57570af4d0a',
      },
      {
        title: 'Salon Edison Lite',
        onClick: () => setScene('salon_edison_lite'),
        backgroundImage: 'unsplash-1458172594959-b57570af4d0a',
      },
      {
        title: 'Salon Off',
        onClick: () => setScene('salon_off'),
        backgroundImage: 'unsplash-1580644327874-c637192725a8',
      },
      {
        title: 'Salon Red',
        onClick: () => setScene('salon_red'),
        backgroundImage: 'unsplash-1535868463750-c78d9543614f',
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
        title: 'Chambre Toggle',
        onClick: () => setScene('chambre_toggle'),
        backgroundImage: 'unsplash-1522771739844-6a9f6d5f14af',
        isBackgroundImageGray: computed(() => dataWsNodeRed.value?.main_sensors?.all_lights?.chambre === 0),
      },
    ].map((r) => new PageItem(r));

    panel.value.addPages(
      Page.generatePagesFromItems(rawItems, {
        pageRows: 3,
      }),
    );
  }

  return {
    panel,
    initPanel,
  };
}
