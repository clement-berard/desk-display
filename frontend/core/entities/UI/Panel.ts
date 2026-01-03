import type { Page } from '~/core/entities/UI/Page';

interface PanelParams {
  id: string;
  name?: string;
  isLoading?: boolean;
  emoji?: string | any; // Using any to allow for icons like Camera from lucide-vue-next
  pages?: Page[] | Page;
}

export class Panel {
  private _pages: Page[] = [];
  id: string;
  name?: string;
  emoji?: string | any; // Using any to allow for icons like Camera from lucide-vue-next
  isLoading?: boolean;

  constructor(params: PanelParams) {
    this.id = params.id;
    this.name = params?.name;
    this.emoji = params?.emoji;
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
