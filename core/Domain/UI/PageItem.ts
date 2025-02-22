interface PageItemParams {
  backgroundImage?: string;
}

export class PageItem {
  private backgroundImage: string | undefined;

  constructor(params: PageItemParams) {
    this.backgroundImage = params.backgroundImage;
  }
}
