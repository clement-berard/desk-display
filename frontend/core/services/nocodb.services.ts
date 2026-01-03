import { RadioItem } from '~/core/Domain/Entities/Radio';
import { NC_TABLE_RADIO_ID, nocodbInstance } from '~/core/providers/noco-db';

export async function getRadios() {
  try {
    const response = await nocodbInstance
      .get(`${NC_TABLE_RADIO_ID}/records`, {
        searchParams: {
          fields: 'slug,label,out_media_img,out_media_url',
          sort: '-counter,-last_selected_date,slug',
        },
      })
      .json<{ list: any[] }>();

    return response.list
      .filter((item) => item.slug)
      .map((item) => {
        return new RadioItem({
          audioMediaUrl: item.out_media_url,
          imgUrl: item.out_media_img,
          label: item.label,
          slug: item.slug,
        });
      });
  } catch (error) {
    console.error('Error while fetching radios:', error);
    throw new Error('Unable to fetch radios.');
  }
}
