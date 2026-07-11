import config from '$lib/config.json';
import { error } from '@sveltejs/kit';
import { loadFromCache, setPublicCacheHeaders } from '$lib/server/warzone-api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch, setHeaders }) => {
  // params.mapid comes from the [mapid] route segment
  const { mapid } = params;

  if (!mapid) {
    throw error(400, 'Missing map');
  }

  setPublicCacheHeaders(setHeaders, {
    browserMaxAge: 300,
    edgeMaxAge: 3600,
    staleWhileRevalidate: 86400
  });

  const map = await loadFromCache(`warzone:maps:${mapid}`, 60 * 1000, async () => {
    const url = `${config.API_BASE}/mc/maps/${encodeURIComponent(mapid)}`;
    const res = await fetch(url);

    if (res.status === 404) {
      throw error(404, 'Map not found');
    }

    if (!res.ok) {
      throw error(res.status || 500, 'Failed to fetch map data');
    }

    return res.json();
  });

  return { map };

}
