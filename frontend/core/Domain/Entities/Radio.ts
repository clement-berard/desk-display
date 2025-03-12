interface RadioParams {
  img_url: string;
  label: string;
  slug: string;
}

export class RadioItem {
  img_url: string;
  label: string;
  slug: string;

  constructor({ slug, label, img_url }: RadioParams) {
    this.img_url = img_url;
    this.label = label;
    this.slug = slug;
  }
}
