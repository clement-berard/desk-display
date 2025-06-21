interface RadioParams {
  audioMediaUrl?: string;
  imgUrl?: string;
  label: string;
  slug: string;
}

export class RadioItem {
  audioMediaUrl?: string;
  imgUrl?: string;
  label: string;
  slug: string;

  constructor(radioInput: RadioParams) {
    this.audioMediaUrl = radioInput.audioMediaUrl;
    this.imgUrl = radioInput.imgUrl;
    this.label = radioInput.label;
    this.slug = radioInput.slug;
  }
}
