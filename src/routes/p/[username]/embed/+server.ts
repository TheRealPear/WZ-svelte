import config from '#lib/config.json';
import { loadCachedWarzoneJson, loadFromCache } from '#lib/server/warzone-api.js';
import { error } from '@sveltejs/kit';
import { calculateLevel } from '#lib/scripts/pgm.js';

type Rank = {
  _id: string;
  displayName: string;
  priority: number;
  prefix?: string | null;
};

export async function GET({ params, fetch }) {
  const username = params.username;

  if (!username) {
    throw error(400, 'Missing username');
  }

  const player = await loadFromCache(`warzone:player:${username}`, 60 * 1000, async () => {
    const res = await fetch(
      `${config.API_BASE}/mc/players/${encodeURIComponent(username)}`
    );

    if (res.status === 404) {
      throw error(404, 'Player not found.');
    }

    if (!res.ok) {
      throw error(res.status || 500, 'Failed to fetch player data');
    }

    return res.json();
  });

  const stats = player.stats ?? {};
  const rankIds: string[] = player.rankIds ?? [];

  // Rank data is cached separately and can be skipped if unavailable.
  let highestRank: string | undefined;
  try {
    const ranks = await loadCachedWarzoneJson<Rank[]>(fetch, '/mc/ranks', 60 * 60 * 1000);
    const rankById = new Map(
      ranks
        .filter((rank) => rank.prefix !== null)
        .map((rank) => [rank._id, rank])
    );

    highestRank =
      rankIds
        .map((id) => rankById.get(id))
        .filter((rank): rank is Rank => Boolean(rank))
        .sort((a, b) => b.priority - a.priority)[0]?.displayName;
  } catch {
  }

  const discordDate = (value: unknown) => {
    const timestamp = Number(value);
    return Number.isFinite(timestamp)
      ? `<t:${Math.floor(timestamp / 1000)}:d>`
      : 'Unknown';
  };

  const profileName = player.name ?? username;
  const avatarId = encodeURIComponent(player._id ?? 'MHF_Steve');
  const profileUrl = `https://warzone.network/p/${encodeURIComponent(username)}`;

  return Response.json(
    {
      component: {
        type: 17,
        accent_color: 9521363,
        components: [
          {
            type: 9,
            components: [
              {
                type: 10,
                content: `## [${profileName}](${profileUrl})\n${highestRank ? `**${highestRank}**\n` : ''}**Level:** ${calculateLevel(stats.xp ?? 0)}`
              }
            ],
            accessory: {
              type: 11,
              media: {
                url: `https://minotar.net/helm/${avatarId}.png`
              }
            }
          },
          { type: 14, divider: true, spacing: 1 },
          {
            type: 10,
            content:
              `### Activity\n` +
              `**First Join:** ${discordDate(player.firstJoinedAt)} | **Last Seen:** ${discordDate(player.lastJoinedAt)}\n` +
              `**Hours Spent:** ${Math.floor((stats.gamePlaytime ?? 0) / 3_600_000)} | **Matches Played:** ${stats.matches ?? 0}`
          },
          { type: 14, divider: true, spacing: 1 },
          {
            type: 10,
            content:
              `### Stats at a Glance\n` +
              `**Kills:** ${stats.kills ?? 0} | **Deaths:** ${stats.deaths ?? 0}\n` +
              `**Wins:** ${stats.wins ?? 0} | **Ties:** ${stats.ties ?? 0} | **Losses:** ${stats.losses ?? 0}\n\n` +
              `-# <:warzone:359887218845810698> Profile details provided by Warzone.`
          }
        ]
      }
    },
    { headers: { 'Cache-Control': 'public, max-age=60, s-maxage=300' } }
  );
}
