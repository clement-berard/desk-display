import ky from 'ky';

export const NC_TABLE_RADIO_ID = 'mpuxqg1lu7rspo6';

export const nocodbInstance = ky.create({
  prefixUrl: `${import.meta.env.VITE_NOCODB_API_URL as string}/tables`,
  headers: {
    'xc-token': import.meta.env.VITE_NOCODB_API_TOKEN as string,
    'Content-Type': 'application/json',
  },
  searchParams: {
    limit: 20000,
  },
});
