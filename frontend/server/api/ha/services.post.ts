import { defineEventHandler, getQuery } from '#imports';
import { haApiServicePost } from '~/core/Infra/Providers/ha-api';

export default defineEventHandler(async (event) => {
  const { entityId = '', path = '' } = getQuery<{ entityId: string; path?: string }>(event);

  // const titi = haApiServicePost({
  //   path: 'fan/toggle',
  //   entityId: 'fan.xiaomi_smart_fan',
  // });

  const titi = haApiServicePost({
    path,
    entityId,
  });

  const result = await titi.json();

  return {
    result,
    path,
  };
});
