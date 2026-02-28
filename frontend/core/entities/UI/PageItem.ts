import type { ComputedRef } from 'vue';
import { getUnsplashImage } from '~/utils/utils';

type OnClickHandler = (pageItem: PageItem) => unknown | Promise<unknown>;

interface PageItemParams {
  backgroundImage?: string;
  title?: string;
  onClick?: OnClickHandler;
  isBackgroundImageGray?: boolean | ComputedRef<boolean>;
}

export class PageItem {
  readonly backgroundImage?: string;
  readonly title?: string;
  readonly isBackgroundImageGray: boolean | ComputedRef<boolean>;

  private readonly onClickHandler?: OnClickHandler;

  constructor({ backgroundImage, title, onClick, isBackgroundImageGray = false }: PageItemParams = {}) {
    this.backgroundImage = this.parseBackgroundImage(backgroundImage);
    this.title = title;
    this.onClickHandler = onClick;
    this.isBackgroundImageGray = isBackgroundImageGray;
  }

  private parseBackgroundImage(input?: string): string | undefined {
    if (input?.startsWith('unsplash-')) {
      return getUnsplashImage(input.slice(9));
    }
    return input;
  }

  onClick(): unknown | Promise<unknown> | undefined {
    return this.onClickHandler?.(this);
  }
}
