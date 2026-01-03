import { nodeRedClient } from '~/core/providers/node-red';

export async function callNodeRedDisplayDeskApi(action = '', payload = {}) {
  try {
    await nodeRedClient.post('desk-display', {
      json: {
        action,
        payload,
      },
    });
  } catch (e) {
    console.error('callNodeRedDisplayDeskApi:', e);
    throw new Error('Error when callNodeRedDisplayDeskApi');
  }
}

export async function setRandomRadio() {
  await callNodeRedDisplayDeskApi('action_select_radio_random');
}

export async function setRadio(radioSlug: string): Promise<void> {
  await callNodeRedDisplayDeskApi('action_select_radio_set', {
    radio: radioSlug,
  });
}
