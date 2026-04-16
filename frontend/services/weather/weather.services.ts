const getFullUrl = (name = '') => `https://basmilius.github.io/meteocons/production/fill/svg/${name}.svg`;
const matcherUrls = {
  partlycloudy: 'partly-cloudy-day',
  sunny: 'clear-day',
  rainy: 'rain',
};

export function getIconUrlFromState(state: string) {
  // @ts-expect-error
  const nameMatch = matcherUrls?.[state] || state;

  return getFullUrl(nameMatch);
}
