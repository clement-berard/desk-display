import type { Page } from '~/core/Domain/UI/Page';

interface PanelParams {
  id: string;
  name?: string;
}

export class Panel {
  pages: Page[] = [];
  id: string;
  name?: string;
  isLoading?: false;

  constructor(params: PanelParams) {
    this.id = params.id;
    this.name = params?.name;
  }

  addPage(page: Page) {
    this.pages.push(page);
  }

  addPages(pages: Page[]) {
    this.pages = pages;
  }
}
