import { defineEventHandler, getQuery } from '#imports';
import { Repository } from '~/core/Infra/Repository';

export default defineEventHandler(async (event) => {
  const { random = false, slug } = getQuery<{ random: boolean; slug?: string }>(event);
  const repository = new Repository();

  if (random) {
    await repository.setRandomRadio();
  }

  if (slug) {
    await repository.setRadio(slug);
  }

  return {
    ok: true,
  };
});
