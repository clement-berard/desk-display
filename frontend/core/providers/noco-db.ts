import ky from 'ky';
export const NC_TABLE_RADIO_ID = 'mpuxqg1lu7rspo6';
export const nocodbInstance = ky.create({
  prefixUrl: `${process.env.NOCODB_API_URL as string}/data`,
  headers: {
    'xc-token': process.env.NOCODB_API_TOKEN as string,
    'Content-Type': 'application/json',
  },
  searchParams: {
    pageSize: 20000,
  },
});

function getNocoDbInstance(dbName: string) {
  return nocodbInstance.extend((parentOptions) => ({
    prefixUrl: `${parentOptions.prefixUrl}/${dbName}`,
  }));
}

export const nocodbDeskDisplay = getNocoDbInstance(process.env.NOCODB_DB_DESK_DISPLAY as string);

export function formatSearchParamsSorting(term: string) {
  return JSON.stringify(
    term.split(',').map((val) => ({
      field: val.startsWith('-') ? val.slice(1) : val,
      direction: val.startsWith('-') ? 'desc' : 'asc',
    })),
  );
}
