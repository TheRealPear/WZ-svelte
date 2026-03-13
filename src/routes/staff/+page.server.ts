import { loadCachedWarzoneJson, setPublicCacheHeaders } from '$lib/server/warzone-api';
import type { PageServerLoad } from './$types';

type Rank = {
  _id: string;
  name: string;
  displayName: string;
  staff: boolean;
  priority: number;
};

type StaffRank = Pick<Rank, '_id' | 'name' | 'displayName' | 'staff' | 'priority'>;

type Player = {
  id: string;
  name: string;
};

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setPublicCacheHeaders(setHeaders, {
    browserMaxAge: 300,
    edgeMaxAge: 900,
    staleWhileRevalidate: 86400
  });

  try {
    const allRanks = await loadCachedWarzoneJson<Rank[]>(fetch, '/mc/ranks', 60 * 60 * 1000);

    const staffRanks: StaffRank[] = allRanks
      .filter((rank) => rank.staff)
      .sort((a, b) => b.priority - a.priority)
      .map(({ _id, name, displayName, priority, staff }) => ({
        _id,
        name,
        displayName,
        priority,
        staff
      }));

    const staffPlayers = Object.fromEntries(
      await Promise.all(
        staffRanks.map(async (rank) => {
          try {
            const allPlayers = await loadCachedWarzoneJson<Player[]>(
              fetch,
              `/mc/ranks/${rank._id}/players`,
              15 * 60 * 1000
            );

            const javaPlayers = (allPlayers ?? []).filter(
              (player) => !['.', '*'].includes(player.name.charAt(0))
            );

            return [rank._id, javaPlayers] as const;
          } catch {
            return [rank._id, []] as const;
          }
        })
      )
    ) as Record<string, Player[]>;

    return {
      staffRanks,
      staffPlayers,
      error: null
    };
  } catch {
    return {
      staffRanks: [] as StaffRank[],
      staffPlayers: {} as Record<string, Player[]>,
      error: 'Failed to load staff data'
    };
  }
};
