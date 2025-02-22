import ky from 'ky';

export const nodeRedClient = ky.create({
  prefixUrl: process.env.NODE_RED_API_PREFIX_URL as string,
});
