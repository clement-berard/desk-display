import { defineEventHandler, getQuery } from '#imports';
import { setRadio, setRandomRadio } from '~/core/services/node-red.services';

export default defineEventHandler(async (event) => {
  const { random = false, slug } = getQuery<{ random: boolean; slug?: string }>(event);

  if (random) {
    await setRandomRadio();
  }

  if (slug) {
    await setRadio(slug);
  }

  return {
    ok: true,
  };
});
