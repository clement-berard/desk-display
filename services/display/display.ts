import { nodeRedClient } from '~/services/api/node-red';

export async function handleLowBrightness() {
  await nodeRedClient.post('desk-display', {
    json: {
      action: 'action_hard_display',
      payload: {
        action: 'low_brightness_mode',
      },
    },
  });
}

export async function handleStandBy() {
  await nodeRedClient.post('desk-display', {
    json: {
      action: 'action_hard_display',
      payload: {
        action: 'standby_mode',
      },
    },
  });
}

export async function handleWakeUp() {
  await nodeRedClient.post('desk-display', {
    json: {
      action: 'action_hard_display',
      payload: {
        action: 'on_mode',
      },
    },
  });
}
