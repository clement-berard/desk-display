import type { RadioItem } from '~/core/Domain/Entities/Radio';

export interface IRepository {
  getRadios(): Promise<RadioItem[]>;
  setRandomRadio(): Promise<void>;
  setRadio(radioSlug: string): Promise<void>;
  callNodeRedDisplayDeskApi(): Promise<void>;
}
