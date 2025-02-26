import type { ComputedRef } from 'vue';
import { getUnsplashImage } from '~/utils/utils';

interface PageItemParams {
  backgroundImage?: string;
  title?: string;
  onClick?: (pageItem: PageItem) => any | Promise<any>;
  isBackgroundImageGray?: boolean | ComputedRef<boolean>;
}

export class PageItem {
  backgroundImage?: string;
  private _onClick?: (pageItem: PageItem) => any | Promise<any>;
  title?: string;
  isBackgroundImageGray?: boolean | ComputedRef<boolean> = false;

  constructor(params?: PageItemParams) {
    this.backgroundImage = this.getBackgroundImage(params?.backgroundImage);
    this._onClick = params?.onClick;
    this.title = params?.title;
    this.isBackgroundImageGray = params?.isBackgroundImageGray;
  }

  private getBackgroundImage(inputBackgroundImage?: string) {
    const isUnsplashImage = inputBackgroundImage?.startsWith('unsplash');

    if (inputBackgroundImage && isUnsplashImage) {
      const [, idImage] = inputBackgroundImage.split('unsplash-');

      return getUnsplashImage(idImage);
    }

    return inputBackgroundImage;
  }

  onClick() {
    return this._onClick?.call(this, this);
  }
}
