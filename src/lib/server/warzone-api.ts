import config from '$lib/config.json';

type FetchLike = typeof fetch;

type CacheEntry<T> = {
  data: T;
  expiresAt: number;
};

type CachePolicy = {
  browserMaxAge: number;
  edgeMaxAge?: number;
  staleWhileRevalidate?: number;
};

const responseCache = new Map<string, CacheEntry<unknown>>();
const inflightCache = new Map<string, Promise<unknown>>();

function pruneExpiredEntries(now: number) {
  for (const [key, entry] of responseCache) {
    if (entry.expiresAt <= now) {
      responseCache.delete(key);
    }
  }
}

export async function loadFromCache<T>(
  key: string,
  ttlMs: number,
  loader: () => Promise<T>
): Promise<T> {
  const now = Date.now();
  pruneExpiredEntries(now);
  const cached = responseCache.get(key) as CacheEntry<T> | undefined;

  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  const inflight = inflightCache.get(key) as Promise<T> | undefined;
  if (inflight) {
    return inflight;
  }

  const request = loader()
    .then((data) => {
      responseCache.set(key, {
        data,
        expiresAt: Date.now() + ttlMs
      });
      return data;
    })
    .finally(() => {
      inflightCache.delete(key);
    });

  inflightCache.set(key, request);
  return request;
}

export async function loadCachedWarzoneJson<T>(
  fetchFn: FetchLike,
  path: string,
  ttlMs: number
): Promise<T> {
  return loadFromCache(`warzone:${path}`, ttlMs, async () => {
    const response = await fetchFn(`${config.API_BASE}${path}`);

    if (!response.ok) {
      throw new Error(`Warzone API request failed for ${path} (${response.status})`);
    }

    return response.json() as Promise<T>;
  });
}

export function setPublicCacheHeaders(
  setHeaders: (headers: Record<string, string>) => void,
  policy: CachePolicy
) {
  const edgeMaxAge = policy.edgeMaxAge ?? policy.browserMaxAge;
  const staleWhileRevalidate = policy.staleWhileRevalidate ?? edgeMaxAge;

  setHeaders({
    'cache-control': `public, max-age=${policy.browserMaxAge}, s-maxage=${edgeMaxAge}, stale-while-revalidate=${staleWhileRevalidate}`
  });
}
