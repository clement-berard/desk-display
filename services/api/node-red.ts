import ky from 'ky';

export const nodeRedClient = ky.create({
  prefixUrl: import.meta.env.VITE_NODE_RED_API_PREFIX_URL as string,
});
