import ky from 'ky';

const baseApiUrl = process.env.HA_BASE_API_URL as string;

export const haApiInstance = ky.create({
  prefixUrl: baseApiUrl,
  headers: {
    Authorization: `Bearer ${process.env.HA_API_TOKEN as string}`,
    'Content-Type': 'application/json',
  },
  searchParams: {},
});

export function haApiServicePost(params: { path: string; entityId?: string }) {
  const inst = haApiInstance.extend({
    prefixUrl: `${baseApiUrl}/services`,
    method: 'POST',
  });

  return inst(params.path, {
    json: {
      entity_id: params.entityId,
    },
  });
}
