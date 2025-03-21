import type { RadioItem } from '~/core/Domain/Entities/Radio';
import { Page } from '~/core/Domain/UI/Page';
import { PageItem } from '~/core/Domain/UI/PageItem';
import { Panel } from '~/core/Domain/UI/Panel';
import { computed, ref, storeToRefs, useFetch, useWsNodeRedStore } from '#imports';

export function useRadiosPanel() {
  const { dataWsNodeRed } = storeToRefs(useWsNodeRedStore());
  const currentSelectedRadio = computed(() => dataWsNodeRed?.value?.sonos_player_media?.select_radio_details?.slug);
  const panel = ref<Panel>(new Panel({ id: 'radios_panel', name: 'Radios', emoji: '📡' }));

  async function initPanel() {
    panel.value.isLoading = true;
    const { data } = await useFetch<RadioItem[]>(() => '/api/radios', {});

    const radiosItems = (data.value || []).map((radio) => {
      return new PageItem({
        backgroundImage: radio.img_url,
        onClick: async () => {
          if (currentSelectedRadio.value !== radio?.slug) {
            await $fetch('/api/radios/set', {
              query: {
                slug: radio.slug,
              },
            });
          }
        },
      });
    });

    panel.value.addPages(
      Page.generatePagesFromItems(radiosItems, {
        pageRows: 3,
        pageColumn: 6,
      }),
    );

    panel.value.isLoading = false;
  }

  async function setRandomRadio() {
    return useFetch('/api/radios/set', {
      query: {
        random: true,
      },
    });
  }

  return {
    setRandomRadio,
    currentSelectedRadio,
    panel,
    initPanel,
  };
}
