import { cluster } from 'radash';
import { Page } from '~/core/Domain/UI/Page';
import type { PageItem } from '~/core/Domain/UI/PageItem';

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

  addPages(pages: Page[] | Page) {
    const allPages: Page[] = Array.isArray(pages) ? pages : [pages];
    this.pages = [...this.pages, ...allPages];
  }

  generatePagesFromItems(items: PageItem[], itemPerPage = 10) {
    const clusteredItems = cluster(items || [], itemPerPage);
    this.addPages(
      clusteredItems.map((pageItem) => {
        const page = new Page();
        page.addPageItems(pageItem);

        return page;
      }),
    );
  }

  get pagesNumber() {
    return this.pages.length;
  }
}
