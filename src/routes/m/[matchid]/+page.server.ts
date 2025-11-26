import config from '$lib/config.json';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const { matchid } = params;

  if (!matchid) {
    throw error(400, 'Missing match ID');
  }

  const url = `${config.API_BASE}/mc/matches/${encodeURIComponent(matchid)}`;
  const res = await fetch(url);

  if (res.status === 404) {
    throw error(404, 'Match not found');
  }

  if (!res.ok) {
    throw error(res.status || 500, 'Failed to fetch match data');
  }

  const match = await res.json();

  return { match };
};
