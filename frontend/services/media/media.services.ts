export async function callMediaPlayerAction(kind: 'up' | 'down' | 'pause' | 'play' | 'toggle_mute') {
  return $fetch('/api/node-red/desk-display-api', {
    query: {
      action: `player_action_${kind}`,
    },
  });
}
