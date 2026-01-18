import { z } from 'zod';

const radioParamsSchema = z
  .object({
    audioMediaUrl: z.string().optional(),
    imgUrl: z.string().optional(),
    label: z.string(),
    slug: z.string(),
  })
  .strict();

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
