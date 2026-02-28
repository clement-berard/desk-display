import type { Component } from 'vue';
import type { Page } from '~/core/entities/UI/Page';

interface PanelParams {
  id: string;
  name?: string;
  isLoading?: boolean;
  emoji?: string | Component;
  pages?: Page[] | Page;
}

export class Panel {
  id: string;
  name?: string;
  emoji?: string | Component;
  isLoading: boolean;

  private _pages: Page[] = [];

  constructor({ id, name, emoji, isLoading = false, pages = [] }: PanelParams) {
    this.id = id;
    this.name = name;
    this.emoji = emoji;
    this.isLoading = isLoading;

    if (pages) {
      this.addPages(pages);
    }
  }

  addPages(pages: Page[] | Page) {
    const allPages = Array.isArray(pages) ? pages : [pages];

    this._pages.push(...allPages);
  }

  get pages(): Page[] {
    return this._pages;
  }
}
