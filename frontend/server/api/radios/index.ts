import { defineEventHandler } from '#imports';
import { getRadios } from '~/core/services/nocodb.services';

export default defineEventHandler(async () => {
  return getRadios();
});
