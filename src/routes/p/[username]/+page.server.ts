import config from '$lib/config.json';
import { error } from '@sveltejs/kit';
import { loadCachedWarzoneJson, loadFromCache, setPublicCacheHeaders } from '$lib/server/warzone-api';
import type { PageServerLoad } from './$types';

type AchievementDefinition = {
  _id: string;
  name?: string;
  description?: string;
  firstCompletion?: unknown;
};

type PlayerAchievement = {
  completionTime: number;
};

type Rank = {
  _id: string;
  displayName: string;
  priority: number;
  prefix?: string | null;
};

const colorMap: Record<string, string> = {
  Administrator: 'badge-mcred',
  Developer: 'badge-mcred',
  'Senior Moderator': 'badge-mcgold',
  Moderator: 'badge-mcgold',
  'Junior Moderator': 'badge-mcgold',
  'Map Developer': 'badge-mcblue',
  'Events Team': 'badge-mclightpurple',
  'Head of Events': 'badge-mclightpurple',
  'VIP++': 'badge-mcdarkaqua',
  'VIP+': 'badge-mcaqua',
  VIP: 'badge-mcgreen'
};

export const load: PageServerLoad = async ({ params, fetch, setHeaders }) => {
  // params.username comes from the [username] route segment
  const { username } = params;

  if (!username) {
    throw error(400, 'Missing username');
  }

  setPublicCacheHeaders(setHeaders, {
    browserMaxAge: 60,
    edgeMaxAge: 300,
    staleWhileRevalidate: 3600
  });

  const player = await loadFromCache(`warzone:player:${username}`, 60 * 1000, async () => {
    const profileUrl = `${config.API_BASE}/mc/players/${encodeURIComponent(username)}`;
    const res = await fetch(profileUrl);

    if (res.status === 404) {
      throw error(404, 'Player not found. Please check the username and try again.');
    }

    if (!res.ok) {
      throw error(res.status || 500, 'Failed to fetch player data');
    }

    return res.json();
  });

  // resolve achievements
  const stats = (player.stats ?? {}) as Record<string, any>;
  const playerAchievements = (stats.achievements ?? {}) as Record<string, PlayerAchievement>;
  const rankIds = (player.rankIds ?? []) as string[];

  let achievements: {
    id: string;
    name?: string;
    description?: string;
    unlocked: boolean;
    completionTime?: number | null;
    firstToUnlock?: boolean;
  }[] = [];

  let resolvedRanks: {
    name: string;
    priority: number;
    color?: string;
  }[] = [];

  try {
    const [allAchievements, allRanks] = await Promise.all([
      loadCachedWarzoneJson<AchievementDefinition[]>(fetch, '/mc/achievements', 24 * 60 * 60 * 1000),
      loadCachedWarzoneJson<Rank[]>(fetch, '/mc/ranks', 60 * 60 * 1000)
    ]);

    const playerId = player._id;

    achievements = allAchievements.map((entry) => {
      const unlocked = playerAchievements[entry._id];
      const firstCompletionId = typeof entry.firstCompletion === 'string' ? entry.firstCompletion : null;

      return {
        id: entry._id,
        name: entry.name,
        description: entry.description,
        unlocked: !!unlocked,
        completionTime: unlocked?.completionTime ?? null,
        firstToUnlock:
          firstCompletionId != null &&
          playerId != null &&
          String(firstCompletionId) === String(playerId)
      };
    });

    const rankMap = allRanks
      .filter((rank) => rank.prefix !== null)
      .reduce<Record<string, { name: string; priority: number; color?: string }>>((acc, rank) => {
        acc[rank._id] = {
          name: rank.displayName,
          priority: rank.priority,
          color: colorMap[rank.displayName]
        };

        return acc;
      }, {});

    const seenNames = new Set<string>();
    resolvedRanks = rankIds
      .map((id) => rankMap[id])
      .filter((rank): rank is { name: string; priority: number; color?: string } => {
        if (!rank?.name || seenNames.has(rank.name)) {
          return false;
        }

        seenNames.add(rank.name);
        return true;
      })
      .sort((a, b) => b.priority - a.priority);
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

  return { player, achievements, resolvedRanks };
};
