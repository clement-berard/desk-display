import { defineEventHandler, getQuery } from '#imports';
import { Repository } from '~/core/Infra/Repository';

export default defineEventHandler(async (event) => {
  const { action } = getQuery<{ action: string }>(event);
  const repository = new Repository();

  if (action === 'display-on') {
    await repository.callNodeRedDisplayDeskApi('action_hard_display', { service: 'on' });
  }

  if (action === 'display-standby') {
    await repository.callNodeRedDisplayDeskApi('action_hard_display', { service: 'standby' });
  }

  if (action === 'display-low-brightness') {
    await repository.callNodeRedDisplayDeskApi('action_hard_display', { service: 'low-brightness' });
  }

  if (action.startsWith('player_action')) {
    const [, kind] = action.split('player_action_');
    await repository.callNodeRedDisplayDeskApi('action_sonos_media_player_volume', {
      direction: kind,
    });
  }

  if (action.startsWith('set_lights')) {
    const [, scene] = action.split('set_lights_');
    await repository.callNodeRedDisplayDeskApi('action_set_lights', {
      scene,
    });
  }

  return {
    ok: true,
  };
});
