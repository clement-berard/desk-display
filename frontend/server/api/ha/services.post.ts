import { defineEventHandler, getQuery } from '#imports';
import { haApiServicePost } from '~/core/providers/ha-api';

export default defineEventHandler(async (event) => {
  const { entityId = '', path = '' } = getQuery<{ entityId: string; path?: string }>(event);

  const req = haApiServicePost({
    path,
    entityId,
  });

  const result = await req.json();

  return {
    result,
    path,
  };
});
