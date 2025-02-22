import type { PageItem } from '~/core/Domain/UI/PageItem';

interface PageParams {
  maxPageItems?: number;
}

export class Page {
  pageItems: PageItem[] = [];
  maxPageItems: number;

  constructor(params: PageParams) {
    this.maxPageItems = params?.maxPageItems || 10;
  }

  addPageItems(items: PageItem[]) {
    this.pageItems = items;
  }

  addPageItem(item: PageItem) {
    this.pageItems.push(item);
  }
}
