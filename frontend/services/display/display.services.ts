export async function callDisplayHandler(action: 'standby' | 'on' | 'low-brightness') {
  await $fetch('/api/node-red/desk-display-api', {
    query: {
      action: `hard-display-${action}`,
    },
  });
}
