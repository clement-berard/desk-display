import { useLightsPanel } from '~/composables/Panels/useLightsPanel';
import { useRadiosPanel } from '~/composables/Panels/useRadiosPanel';
import { Panels } from '~/core/Domain/UI/Panels';

export function useInitPanels() {
  const { panel: panelRadios, initPanel: initPanelRadios } = useRadiosPanel();
  const { panel: panelLights, initPanel: initPanelLights } = useLightsPanel();

  async function initAllPanels() {
    await Promise.all([initPanelRadios(), initPanelLights()]);

    const panelsGroup = new Panels();

    // @ts-ignore
    panelsGroup?.addPanels([panelRadios.value, panelLights.value]);

    return panelsGroup;
  }

  return {
    panelRadios,
    panelLights,
    initAllPanels,
  };
}
