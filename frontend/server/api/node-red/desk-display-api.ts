import { z } from 'zod';
import { defineEventHandler, getQuery } from '#imports';
import { callNodeRedDisplayDeskApi } from '~/core/services/node-red.services';

export default defineEventHandler(async (event) => {
  const { action: inputAction } = getQuery<{ action: string }>(event);
  const action = z.string().parse(inputAction);

  if (action.startsWith('hard-display-')) {
    const [, service] = action.split('hard-display-');
    await callNodeRedDisplayDeskApi('action_hard_display', { service });
  }

  if (action.startsWith('player_action')) {
    const [, kind] = action.split('player_action_');
    return callNodeRedDisplayDeskApi('action_sonos_media_player_volume', {
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
    action,
  };
});
