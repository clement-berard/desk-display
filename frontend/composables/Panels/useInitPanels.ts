import { useLightsPanel } from '~/composables/Panels/useLightsPanel';
import { useMiscPanel } from '~/composables/Panels/useMiscPanel';
import { useRadiosPanel } from '~/composables/Panels/useRadiosPanel';
import { Panels } from '~/core/Domain/UI/Panels';

export function useInitPanels() {
  const { panel: panelRadios, initPanel: initPanelRadios } = useRadiosPanel();
  const { panel: panelLights, initPanel: initPanelLights } = useLightsPanel();
  const { panel: panelMisc, initPanel: initPanelMisc } = useMiscPanel();

  async function initAllPanels() {
    await Promise.all([initPanelRadios(), initPanelLights(), initPanelMisc()]);

    const panelsGroup = new Panels();

    // @ts-ignore
    panelsGroup?.addPanels([panelRadios.value, panelLights.value, panelMisc.value]);

    return panelsGroup;
  }

  return {
    panelRadios,
    panelLights,
    initAllPanels,
  };
}
