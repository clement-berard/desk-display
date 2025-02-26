import type { Page } from '~/core/Domain/UI/Page';

interface PanelParams {
  id: string;
  name?: string;
  isLoading?: boolean;
}

interface GeneratePagesFromItemsParams {
  itemPerPage?: number;
  pageColumn?: number;
  pageRows?: number;
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

  addPages(pages: Page[] | Page) {
    const allPages: Page[] = Array.isArray(pages) ? pages : [pages];
    this.pages = [...this.pages, ...allPages];
  }
}
