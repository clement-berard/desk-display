import * as z from 'zod/mini';
import { defineEventHandler, getQuery } from '#imports';
import { haApiServicePost } from '~/core/providers/ha-api';

const handlerParamsSchema = z.strictObject({
  entityId: z.string(),
  path: z.string(),
});

export default defineEventHandler(async (event) => {
  const queryParams = getQuery<z.infer<typeof handlerParamsSchema>>(event);
  const { entityId, path } = handlerParamsSchema.parse(queryParams);

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
