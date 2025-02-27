import { cluster } from 'radash';
import type { PageItem } from '~/core/Domain/UI/PageItem';

interface PageParams {
  pageColumn?: number;
  pageRows?: number;
}

interface GeneratePagesFromItemsParams {
  pageColumn?: number;
  pageRows?: number;
}

const CONSTANTS = {
  DEFAULT_PAGE_COLUMNS: 5,
  DEFAULT_PAGE_ROWS: 2,
};

export class Page {
  pageItems: PageItem[] = [];
  private readonly maxPageItems: number;
  pageColumn: number;
  pageRows: number;

  constructor(params?: PageParams) {
    this.pageColumn = params?.pageColumn || CONSTANTS.DEFAULT_PAGE_COLUMNS;
    this.pageRows = params?.pageRows || CONSTANTS.DEFAULT_PAGE_ROWS;
    this.maxPageItems = this.pageColumn * this.pageRows;
  }

  addPageItems(items: PageItem[] | PageItem) {
    const allPageItems: PageItem[] = Array.isArray(items) ? items : [items];
    this.pageItems = [...this.pageItems, ...allPageItems];
  }

  getItems(): PageItem[] {
    return this.pageItems.slice(0, this.maxPageItems);
  }

  static generatePagesFromItems(items: PageItem[], opts?: GeneratePagesFromItemsParams) {
    const realColumns = opts?.pageColumn !== undefined ? opts.pageColumn : CONSTANTS.DEFAULT_PAGE_COLUMNS;
    const realRows = opts?.pageRows !== undefined ? opts.pageRows : CONSTANTS.DEFAULT_PAGE_ROWS;
    const itemPerPage = realColumns * realRows;

    const pages: Page[] = [];
    const clusteredItems = cluster(items || [], itemPerPage);

    clusteredItems.map((pageItem) => {
      const page = new Page({
        pageRows: opts?.pageRows,
        pageColumn: opts?.pageColumn,
      });
      page.addPageItems(pageItem);

      pages.push(page);
    });

    return pages;
  }
}
