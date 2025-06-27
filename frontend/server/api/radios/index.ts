import { defineEventHandler } from '#imports';
import { Repository } from '~/core/Infra/Repository';

export default defineEventHandler(async () => {
  const repository = new Repository();
  return repository.getRadios();
});
