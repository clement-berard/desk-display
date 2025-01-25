import ky from 'ky';

export const pdbClient = ky.create({
  prefixUrl: import.meta.env.VITE_POCKETBASE_API_URL as string,
});
