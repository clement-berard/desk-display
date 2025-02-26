import type { Page } from '~/core/Domain/UI/Page';

interface PanelParams {
  id: string;
  name?: string;
  isLoading?: boolean;
  pages?: Page[] | Page;
}

export class Panel {
  private _pages: Page[] = [];
  id: string;
  name?: string;
  isLoading?: boolean;

  constructor(params: PanelParams) {
    this.id = params.id;
    this.name = params?.name;
    this.isLoading = params?.isLoading ?? false;
    this.addPages(params?.pages || []);
  }

  addPages(pages: Page[] | Page) {
    const allPages: Page[] = Array.isArray(pages) ? pages : [pages];
    this._pages = [...this._pages, ...allPages];
  }

  get pages(): Page[] {
    return this._pages;
  }
}
