import config from '$lib/config.json';
import { error } from '@sveltejs/kit';
import { loadFromCache, setPublicCacheHeaders } from '$lib/server/warzone-api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch, setHeaders }) => {
  const { matchid } = params;

  if (!matchid) {
    throw error(400, 'Missing match ID');
  }

  setPublicCacheHeaders(setHeaders, {
    browserMaxAge: 60,
    edgeMaxAge: 300,
    staleWhileRevalidate: 3600
  });

  const match = await loadFromCache(`warzone:match:${matchid}`, 60 * 1000, async () => {
    const url = `${config.API_BASE}/mc/matches/${encodeURIComponent(matchid)}`;
    const res = await fetch(url);

    if (res.status === 404) {
      throw error(404, 'Match not found');
    }

    if (!res.ok) {
      throw error(res.status || 500, 'Failed to fetch match data');
    }

    return res.json();
  });

  return { match };
};
