import retiredRaw from '$lib/retired.json';
import { loadCachedWarzoneJson, loadFromCache, setPublicCacheHeaders } from '$lib/server/warzone-api';
import type { PageServerLoad } from './$types';

type RetiredEntry = {
  uuid: string;
  username: string;
  role: string | string[];
  date: string;
};

type RetiredPlayerResponse = {
  name?: string;
};

type RetiredView = Omit<RetiredEntry, 'role'> & {
  role: string | string[];
  roles: string[];
};

function normalizeRoles(role: string | string[]) {
  return Array.isArray(role) ? role : [role];
}

function mapRetiredEntries(entries: RetiredEntry[]): RetiredView[] {
  return entries.map((entry) => ({
    ...entry,
    roles: normalizeRoles(entry.role)
  }));
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setPublicCacheHeaders(setHeaders, {
    browserMaxAge: 300,
    edgeMaxAge: 3600,
    staleWhileRevalidate: 86400
  });

  const retiredEntries = mapRetiredEntries(retiredRaw as RetiredEntry[]);

  try {
    const retired = await loadFromCache('retired:resolved-usernames', 7 * 24 * 60 * 60 * 1000, async () => {
      return Promise.all(
        retiredEntries.map(async (entry) => {
          try {
            const player = await loadCachedWarzoneJson<RetiredPlayerResponse>(
              fetch,
              `/mc/players/${entry.uuid}`,
              7 * 24 * 60 * 60 * 1000
            );

            return {
              ...entry,
              username: player.name || entry.username
            };
          } catch {
            return entry;
          }
        })
      );
    });

    return {
      retired,
      error: null
    };
  } catch {
    return {
      retired: retiredEntries,
      error: 'Failed to resolve retired staff usernames'
    };
  }
};
