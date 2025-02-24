import type { Panel } from '~/core/Domain/UI/Panel';

export class Panels {
  panels: Panel[] = [];

  addPanels(panels: Panel[] | Panel) {
    const allPanels: Panel[] = Array.isArray(panels) ? panels : [panels];
    this.panels = [...this.panels, ...allPanels];
  }

  get panelNumber() {
    return this.panels.length;
  }

  get panelList() {
    return this.panels;
  }

  findById(id: string) {
    return this.panels.find((panel) => panel.id === id);
  }

  get firstPanel() {
    return this.panels[0];
  }
}
