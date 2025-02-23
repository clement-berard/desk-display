import type { Page } from '~/core/Domain/UI/Page';

interface PanelParams {
  id: string;
  name?: string;
  isLoading?: boolean;
}

export class Panel {
  pages: Page[] = [];
  id: string;
  name?: string;
  isLoading?: boolean;

  constructor(params: PanelParams) {
    this.id = params.id;
    this.name = params?.name;
    this.isLoading = params?.isLoading ?? false;
  }

  addPage(page: Page) {
    this.pages = [...this.pages, page];
  }

  addPages(pages: Page[]) {
    this.pages = [...this.pages, ...pages];
  }
}
