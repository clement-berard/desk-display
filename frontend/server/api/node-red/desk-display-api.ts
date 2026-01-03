import { defineEventHandler, getQuery } from '#imports';
import { callNodeRedDisplayDeskApi } from '~/core/services/node-red.services';

export default defineEventHandler(async (event) => {
  const { action } = getQuery<{ action: string }>(event);

  if (action === 'display-on') {
    await callNodeRedDisplayDeskApi('action_hard_display', { service: 'on' });
  }

  if (action === 'display-standby') {
    await callNodeRedDisplayDeskApi('action_hard_display', { service: 'standby' });
  }

  if (action === 'display-low-brightness') {
    await callNodeRedDisplayDeskApi('action_hard_display', { service: 'low-brightness' });
  }

  if (action.startsWith('player_action')) {
    const [, kind] = action.split('player_action_');
    await callNodeRedDisplayDeskApi('action_sonos_media_player_volume', {
      direction: kind,
    });
  }

  if (action.startsWith('set_lights')) {
    const [, scene] = action.split('set_lights_');
    await callNodeRedDisplayDeskApi('action_set_lights', {
      scene,
    });
  }

  return {
    ok: true,
  };
});
