import type { ComputedRef } from 'vue';
import { getUnsplashImage } from '~/utils/utils';

interface PageItemParams {
  backgroundImage?: string;
  title?: string;
  onClick?: (pageItem: PageItem) => any | Promise<any>;
  isBackgroundImageGray?: boolean | ComputedRef<boolean>;
}

export class PageItem {
  readonly backgroundImage?: string;
  private readonly onClickHandler?: (pageItem: PageItem) => any | Promise<any>;
  readonly title?: string;
  readonly isBackgroundImageGray?: boolean | ComputedRef<boolean> = false;

  constructor(params?: PageItemParams) {
    this.backgroundImage = this.getBackgroundImage(params?.backgroundImage);
    this.onClickHandler = params?.onClick;
    this.title = params?.title;
    this.isBackgroundImageGray = params?.isBackgroundImageGray;
  }

  private getBackgroundImage(inputBackgroundImage?: string) {
    if (!inputBackgroundImage?.startsWith('unsplash')) return inputBackgroundImage;
    const [, id] = inputBackgroundImage.split('unsplash-');
    return getUnsplashImage(id);
  }

  onClick(): ReturnType<NonNullable<typeof this.onClickHandler>> | undefined {
    return this.onClickHandler?.(this);
  }
}
