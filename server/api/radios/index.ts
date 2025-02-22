import { Repository } from '~/core/Infra/Repository';
import { defineEventHandler } from '#imports';

export default defineEventHandler(async (event) => {
  const repository = new Repository();
  return repository.getRadios();
});
