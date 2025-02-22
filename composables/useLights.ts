import { PageItem } from '~/core/Domain/UI/PageItem';
import { Panel } from '~/core/Domain/UI/Panel';
import { computed, ref, storeToRefs, useFetch, useWsNodeRedStore } from '#imports';

export function useLights() {
  const { dataWsNodeRed } = storeToRefs(useWsNodeRedStore());
  const panel = ref<Panel>(new Panel({ id: 'lights_panel', name: 'Lights' }));

  const getUnsplashImage = (id: string) => `https://images.unsplash.com/photo-${id}?q=80&w=300&auto=format&fit=crop`;

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
        backgroundImage: getUnsplashImage('1486312338219-ce68d2c6f44d'),
      },
      {
        title: 'Salon Edison Lite',
        onClick: () => setScene('salon_edison'),
        backgroundImage: getUnsplashImage('1458172594959-b57570af4d0a'),
      },
      {
        title: 'Salon Off',
        onClick: () => setScene('salon_off'),
        backgroundImage: getUnsplashImage('1580644327874-c637192725a8'),
      },
      {
        title: 'Salon Red',
        onClick: () => setScene('salon_red'),
        backgroundImage: getUnsplashImage('1535868463750-c78d9543614f'),
      },
      {
        title: 'Salon Energize',
        onClick: () => setScene('salon_energize'),
        backgroundImage: getUnsplashImage('1663426242582-7c707af07128'),
      },
      {
        title: 'TV Night Good',
        onClick: () => setScene('salon_tv_night_good'),
        backgroundImage: getUnsplashImage('1593305841991-05c297ba4575'),
      },
      {
        title: 'Salon Calm TV',
        onClick: () => setScene('salon_calm_tv'),
        backgroundImage: getUnsplashImage('1624115773145-9b77fe912897'),
      },
      {
        title: 'Chambre Toggle',
        onClick: () => setScene('chambre_toggle'),
        backgroundImage: getUnsplashImage('1522771739844-6a9f6d5f14af'),
        isBackgroundImageGray: computed(() => dataWsNodeRed.value?.main_sensors?.all_lights?.chambre === 0),
      },
      {
        title: 'AUtre truc',
      },
    ].map((r) => new PageItem(r));

    panel.value.generatePagesFromItems(rawItems);
  }

  return {
    panel,
    initPanel,
  };
}
