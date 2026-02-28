import type { Panel } from '~/core/entities/UI/Panel';

export class Panels {
  private _panels: Panel[] = [];

  addPanels(panels: Panel[] | Panel): void {
    const allPanels = Array.isArray(panels) ? panels : [panels];

    this._panels.push(...allPanels);
  }

  get panelNumber(): number {
    return this._panels.length;
  }

  get panelList(): Panel[] {
    return this._panels;
  }

  findById(id: string): Panel | undefined {
    return this._panels.find((panel) => panel.id === id);
  }

  get firstPanel(): Panel | undefined {
    return this._panels[0];
  }
}
