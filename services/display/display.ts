export async function handleLowBrightness() {
  await $fetch('/api/node-red/desk-display-api', {
    query: {
      action: 'display-low-brightness',
    },
  });
}

export async function handleStandBy() {
  await $fetch('/api/node-red/desk-display-api', {
    query: {
      action: 'display-standby',
    },
  });
}

export async function handleWakeUp() {
  await $fetch('/api/node-red/desk-display-api', {
    query: {
      action: 'display-on',
    },
  });
}
