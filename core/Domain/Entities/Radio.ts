interface RadioParams {
  slug: string;
  label: string;
  img_url: string;
}

export class RadioItem {
  slug: string;
  label: string;
  img_url: string;

  constructor({ slug, label, img_url }: RadioParams) {
    this.slug = slug;
    this.label = label;
    this.img_url = img_url;
  }
}
