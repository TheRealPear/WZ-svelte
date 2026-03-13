import { loadCachedWarzoneJson, setPublicCacheHeaders } from '$lib/server/warzone-api';
import type { PageServerLoad } from './$types';

type LeaderboardEntry = {
  id: string;
  name: string;
  score: number;
};

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setPublicCacheHeaders(setHeaders, {
    browserMaxAge: 300,
    edgeMaxAge: 900,
    staleWhileRevalidate: 86400
  });

  try {
    const leaderboard = await loadCachedWarzoneJson<LeaderboardEntry[]>(
      fetch,
      '/mc/leaderboards/XP/ALL_TIME',
      15 * 60 * 1000
    );

    return {
      leaderboard,
      error: null
    };
  } catch {
    return {
      leaderboard: [] as LeaderboardEntry[],
      error: 'Failed to load leaderboard data'
    };
  }
};
