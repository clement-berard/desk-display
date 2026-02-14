import { RadioItem } from '~/core/entities/Radio';
import { formatSearchParamsSorting, NC_TABLE_RADIO_ID, nocodbDeskDisplay } from '~/core/providers/noco-db';

export async function getRadios() {
  const response = await nocodbDeskDisplay
    .get(`${NC_TABLE_RADIO_ID}/records`, {
      searchParams: {
        fields: 'slug,label,out_media_img,out_media_url',
        sort: formatSearchParamsSorting('-counter,-last_selected_date,slug'),
      },
    })
    .json<{ records: any[] }>();

  return response.records
    .map((item) => ({ id: item.id, ...item.fields }))
    .filter((item) => item.slug)
    .map((item) => {
      return new RadioItem({
        audioMediaUrl: item.out_media_url,
        imgUrl: item.out_media_img,
        label: item.label,
        slug: item.slug,
      });
    });
}
