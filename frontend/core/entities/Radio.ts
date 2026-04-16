import * as z from 'zod/mini';

const radioParamsSchema = z.strictObject({
  audioMediaUrl: z.optional(z.string()),
  imgUrl: z.optional(z.string()),
  label: z.string(),
  slug: z.string(),
});

export class RadioItem {
  audioMediaUrl?: string;
  imgUrl?: string;
  label: string;
  slug: string;

  constructor(radioInput: z.infer<typeof radioParamsSchema>) {
    radioParamsSchema.parse(radioInput);

    this.audioMediaUrl = radioInput.audioMediaUrl;
    this.imgUrl = radioInput.imgUrl;
    this.label = radioInput.label;
    this.slug = radioInput.slug;
  }
}
