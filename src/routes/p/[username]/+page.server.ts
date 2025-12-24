import config from '$lib/config.json';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
  // params.username comes from the [username] route segment
  const { username } = params;

  if (!username) {
    throw error(400, 'Missing username');
  }

  const profileUrl = `${config.API_BASE}/mc/players/${encodeURIComponent(username)}`;
  const res = await fetch(profileUrl);

  if (res.status === 404) {
    throw error(404, 'Player not found. Please check the username and try again.');
  }

  if (!res.ok) {
    // other errors (rate limit, 5xx, etc.)
    throw error(res.status || 500, 'Failed to fetch player data');
  }

  const player = await res.json();

  // resolve achievements
  const stats = (player.stats ?? {}) as Record<string, any>;
  const playerAchievements = (stats.achievements ?? {}) as Record<string, { completionTime: number }>;

  let achievements: {
    id: string;
    name?: string;
    description?: string;
    unlocked: boolean;
    completionTime?: number | null;
    firstToUnlock?: boolean;
  }[] = [];

  try {
    const aRes = await fetch(`${config.API_BASE}/mc/achievements`);
    if (aRes.ok) {
      const all = (await aRes.json()) as { _id: string; name?: string; description?: string; firstCompletion?: any }[];
      const playerId = player._id;

      achievements = all.map(a => {
        const pa = playerAchievements[a._id];
        const firstCompletionId = typeof a.firstCompletion === 'string' ? a.firstCompletion : null;

        return {
          id: a._id,
          name: a.name,
          description: a.description,
          unlocked: !!pa,
          completionTime: pa?.completionTime ?? null,
          firstToUnlock: firstCompletionId != null && playerId != null && String(firstCompletionId) === String(playerId)
        };
      });
    } else {
      achievements = Object.entries(playerAchievements).map(([aid, val]) => ({
        id: aid,
        name: undefined,
        description: undefined,
        unlocked: true,
        completionTime: val?.completionTime ?? null,
        firstToUnlock: false
      }));
    }
  } catch {
    achievements = Object.entries(playerAchievements).map(([aid, val]) => ({
      id: aid,
      name: undefined,
      description: undefined,
      unlocked: true,
      completionTime: val?.completionTime ?? null,
      firstToUnlock: false
    }));
  }

  return { player, achievements };
};
