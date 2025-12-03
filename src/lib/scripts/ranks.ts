import config from '$lib/config.json';

type RankEntry = {
  displayName: string;
  priority: number;
  color?: string;
};

const colorMap: Record<string, string> = {
  "Administrator": "badge-mcred",
  "Developer": "badge-mcred",
  "Senior Moderator": "badge-mcgold",
  "Moderator": "badge-mcgold",
  "Junior Moderator": "badge-mcgold",
  "Map Developer": "badge-mcblue",
  "Events Team": "badge-mclightpurple",
  "Head of Events": "badge-mclightpurple",
  "VIP++": "badge-mcdarkaqua",
  "VIP+": "badge-mcaqua",
  "VIP": "badge-mcgreen",
};

let rankMap: Record<string, RankEntry> = {};
let loading: Promise<void> | null = null;

export async function loadRanks() {
  if (loading) return loading;
  loading = (async () => {
    const res = await fetch(`${config.API_BASE}/mc/ranks`);
    const data = await res.json();

    rankMap = data
      .filter((r: any) => r.prefix !== null)
      .reduce((acc: Record<string, RankEntry>, r: any) => {
        acc[r._id] = {
          displayName: r.displayName,
          priority: r.priority,
          color: colorMap[r.displayName]
        };
        return acc;
      }, {});
  })();
  return loading;
}

export function rankName(id: string): string | null {
  return rankMap[id]?.displayName ?? null;
}

export function rankPriority(id: string): number | null {
  return rankMap[id]?.priority ?? null;
}

export function rankColor(id: string): string | undefined {
  return rankMap[id]?.color;
}
