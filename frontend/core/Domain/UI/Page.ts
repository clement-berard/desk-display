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

const DEFAULT_PAGE = {
  COLUMNS: 5,
  ROWS: 2,
} as const;

export class Page {
  pageItems: PageItem[] = [];
  private readonly maxPageItems: number;
  pageColumn: number;
  pageRows: number;

  constructor(params?: PageParams) {
    this.pageColumn = params?.pageColumn || DEFAULT_PAGE.COLUMNS;
    this.pageRows = params?.pageRows || DEFAULT_PAGE.ROWS;
    this.maxPageItems = this.pageColumn * this.pageRows;
  }

  addPageItems(items: PageItem[] | PageItem) {
    const allPageItems: PageItem[] = Array.isArray(items) ? items : [items];
    this.pageItems.push(...allPageItems);

    return this;
  }

  getItems(): PageItem[] {
    return this.pageItems.slice(0, this.maxPageItems);
  }

  static generatePagesFromItems(items: PageItem[], opts?: GeneratePagesFromItemsParams) {
    const realColumns = opts?.pageColumn !== undefined ? opts.pageColumn : DEFAULT_PAGE.COLUMNS;
    const realRows = opts?.pageRows !== undefined ? opts.pageRows : DEFAULT_PAGE.ROWS;
    const itemsPerPage = realColumns * realRows;

    return cluster(items ?? [], itemsPerPage).map((pageItems) => {
      return new Page({ pageColumn: realColumns, pageRows: realRows }).addPageItems(pageItems);
    });
  }
}
