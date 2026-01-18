import { z } from 'zod';
import { defineEventHandler, getQuery } from '#imports';
import { haApiServicePost } from '~/core/providers/ha-api';

const handlerParamsSchema = z
  .object({
    entityId: z.string(),
    path: z.string(),
  })
  .strict();

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
