import { loadCachedWarzoneJson, setPublicCacheHeaders } from '$lib/server/warzone-api';
import type { PageServerLoad } from './$types';

type MapEntry = {
  id: string;
  name: string;
  imageUrl: string;
};

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setPublicCacheHeaders(setHeaders, {
    browserMaxAge: 300,
    edgeMaxAge: 3600,
    staleWhileRevalidate: 86400
  });

  try {
    const maps = await loadCachedWarzoneJson<MapEntry[]>(fetch, '/mc/maps', 60 * 60 * 1000);

    return {
      maps,
      error: null
    };
  } catch {
    return {
      maps: [] as MapEntry[],
      error: 'Failed to load map data'
    };
  }
};
