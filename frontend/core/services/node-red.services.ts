import { nodeRedClient } from '~/core/providers/node-red';

export async function callNodeRedDisplayDeskApi(action = '', payload = {}) {
  return nodeRedClient.post('desk-display', {
    json: {
      action,
      payload,
    },
  });
}

export async function setRandomRadio() {
  await callNodeRedDisplayDeskApi('action_select_radio_random');
}

export async function setRadio(radioSlug: string): Promise<void> {
  await callNodeRedDisplayDeskApi('action_select_radio_set', {
    radio: radioSlug,
  });
}
