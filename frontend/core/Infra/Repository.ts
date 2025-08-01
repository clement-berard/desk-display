import type { KyInstance } from 'ky';
import { RadioItem } from '~/core/Domain/Entities/Radio';
import type { IRepository } from '~/core/Infra/IRepository';
import { NC_TABLE_RADIO_ID, nocodbInstance } from '~/core/Infra/Providers/noco-db';
import { nodeRedClient } from '~/core/Infra/Providers/node-red';

export class Repository implements IRepository {
  private nocoDbKyInstance: KyInstance;
  private nodeRedInstance: KyInstance;

  constructor() {
    this.nocoDbKyInstance = nocodbInstance;
    this.nodeRedInstance = nodeRedClient;
  }

  async getRadios() {
    try {
      const response = await this.nocoDbKyInstance
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

  async callNodeRedDisplayDeskApi(action = '', payload = {}) {
    try {
      await this.nodeRedInstance.post('desk-display', {
        json: {
          action,
          payload,
        },
      });
    } catch (e) {
      console.error('callNodeRedDisplayDeskApi:', e);
      throw new Error('Error when callNodeRedDisplayDeskApi');
    }
  }

  async setRandomRadio() {
    await this.callNodeRedDisplayDeskApi('action_select_radio_random');
  }

  async setRadio(radioSlug: string): Promise<void> {
    await this.callNodeRedDisplayDeskApi('action_select_radio_set', {
      radio: radioSlug,
    });
  }
}
