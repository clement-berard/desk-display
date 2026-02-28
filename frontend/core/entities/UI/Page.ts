import { cluster } from 'radash';
import type { PageItem } from '~/core/entities/UI/PageItem';

interface PageParams {
  pageColumn?: number;
  pageRows?: number;
}

const DEFAULT_PAGE = {
  COLUMNS: 5,
  ROWS: 2,
} as const;

export class Page {
  public readonly id: string = `page-${Math.random().toString(36).substring(2, 9)}`;
  private _pageItems: PageItem[] = [];

  private readonly maxPageItems: number;
  pageColumn: number;
  pageRows: number;

  constructor({ pageColumn = DEFAULT_PAGE.COLUMNS, pageRows = DEFAULT_PAGE.ROWS }: PageParams = {}) {
    this.pageColumn = Math.max(1, pageColumn);
    this.pageRows = Math.max(1, pageRows);

    this.maxPageItems = this.pageColumn * this.pageRows;
  }

  addPageItems(items: PageItem[] | PageItem): this {
    const allPageItems = Array.isArray(items) ? items : [items];
    this._pageItems.push(...allPageItems);

    return this;
  }

  getItems(): PageItem[] {
    return this._pageItems.slice(0, this.maxPageItems);
  }

  static generatePagesFromItems(items: PageItem[], opts?: PageParams): Page[] {
    if (!items?.length) return [];

    const { pageColumn = DEFAULT_PAGE.COLUMNS, pageRows = DEFAULT_PAGE.ROWS } = opts || {};

    const itemsPerPage = Math.max(1, pageColumn * pageRows);

    return cluster(items, itemsPerPage).map((pageItems) => {
      return new Page({ pageColumn, pageRows }).addPageItems(pageItems);
    });
  }
}
