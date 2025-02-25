import type { ComputedRef } from 'vue';
import { getUnsplashImage } from '~/utils/utils';

interface PageItemParams {
  backgroundImage?: string;
  title?: string;
  onClick?: () => void;
  isBackgroundImageGray?: boolean | ComputedRef<boolean>;
}

export class PageItem {
  backgroundImage?: string;
  onClick?: () => void;
  title?: string;
  isBackgroundImageGray?: boolean | ComputedRef<boolean> = false;

  constructor(params?: PageItemParams) {
    this.backgroundImage = params?.backgroundImage;
    this.onClick = params?.onClick;
    this.title = params?.title;
    this.isBackgroundImageGray = params?.isBackgroundImageGray;
  }

  getBackgroundImage() {
    const isUnsplashImage = this.backgroundImage?.startsWith('unsplash');

    if (this.backgroundImage && isUnsplashImage) {
      const [, idImage] = this.backgroundImage.split('unsplash-');

      return getUnsplashImage(idImage);
    }

    return this.backgroundImage;
  }
}
