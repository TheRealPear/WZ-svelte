<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate, formatDateSimplified, formatHours } from '$lib/scripts/date';
  import { calculateLevel, formatXPProgress } from '$lib/scripts/pgm';
  import { rankName, rankPriority, rankColor, loadRanks } from '$lib/scripts/ranks';
  import { onMount } from 'svelte';

  export let data: PageData;

  const player = (data.player ?? {}) as any;
  const id = (player._id as string) ?? ''; // UUID for Minotar
  const name = (player.name as string) ?? 'Unknown';
  const firstJoinMs = (player.firstJoinedAt as number) ?? 1419033600000;
  const lastJoinMs = (player.lastJoinedAt as number) ?? 1419033600000;
  const rankIds: string[] = player.rankIds ?? [];
  const stats = (player.stats ?? {}) as Record<string, any>;
  const exp = (stats.xp ?? 0) as number;
  const playTime = (stats.gamePlaytime ?? 0) as number;
  const kills = (stats.kills ?? 0) as number;
  const deaths = (stats.deaths ?? 0) as number;
  const wins = (stats.wins ?? 0) as number;
  const losses = (stats.losses ?? 0) as number;
  const ties = (stats.ties ?? 0) as number;
  const matches = (stats.matches ?? 0) as number;

  type ResolvedRank = {
    name: string;
    priority: number;
    color?: string;
  };

  let resolvedRanks: ResolvedRank[] = [];

  onMount(async () => {
    await loadRanks();
    const removeDuplicate = new Set<string>();
    resolvedRanks = rankIds
      .map(id => ({
        name: rankName(id)!,
        priority: rankPriority(id)!,
        color: rankColor(id)
      }))
      .filter(r => {
        if (!r.name || r.priority === null) return false;
        if (removeDuplicate.has(r.name)) return false;
        removeDuplicate.add(r.name);
        return true;
      })
      .sort((a, b) => b.priority - a.priority);
  });
</script>

<svelte:head>
  <title>{name}</title>
</svelte:head>

<div class="mx-auto max-sm:m-4 max-w-4xl w-full">
  <!-- User info card -->
  <div class="card w-full shadow">
    <div class="card-body">
      <h1 class="card-title">
        <div class="grid grid-cols-[auto_1fr_auto] gap-x-6 items-center w-full">
          <!-- Left column -->
          <div>
            <img class="size-24 rounded flex-shrink-0 shadow-lg/20" alt="" src={"https://minotar.net/helm/" + id + ".svg"}/>
          </div>
          <!-- Middle column -->
          <div class="flex flex-col items-start space-y-2">
            <div class="text-3xl">{name}</div>
            <!-- Rank badges -->
            {#if resolvedRanks.length > 0}<!-- Prevent gap below username when there's no ranks -->
            <div class="flex gap-1">
              {#each resolvedRanks as rank}
              <div class="badge badge-lg {rank.color}">{rank.name}</div>
              {/each}
            </div>
            {/if}
          </div>
          <!-- Right column -->
          <div class="flex flex-col justify-self-end items-center space-y-1">
            <div class="font-normal text-base-content/60">Level</div>
            <div class="tooltip tooltip-left" data-tip="XP: {formatXPProgress(exp)}">
              <div class="text-4xl font-extrabold">{calculateLevel(exp)}</div>
            </div>
          </div>
        </div>
      </h1>
    </div>
  </div>
  <!-- Details card -->
  <div class="card w-full shadow my-4">
    <div class="card-body">
      <h1 class="card-title">Activity</h1>
      <div class="stats w-full">
        <div class="stat">
          <div class="stat-title">First Join</div>
          <div class="tooltip" data-tip="{formatDate(firstJoinMs)}">
            <div class="stat-value">{formatDateSimplified(firstJoinMs)}</div>
          </div>
        </div>
        <div class="stat">
          <div class="stat-title">Last Seen</div>
          <div class="tooltip" data-tip="{formatDate(lastJoinMs)}">
            <div class="stat-value">{formatDateSimplified(lastJoinMs)}</div>
          </div>
        </div>
        <div class="stat">
          <div class="stat-title">Hours Played</div>
          <div class="stat-value">{formatHours(playTime)}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Matches</div>
          <div class="stat-value">{matches}</div>
        </div>
      </div>
    </div>
  </div>
  <!-- Quick Stats card -->
  <div class="card w-full shadow">
    <div class="card-body">
      <h1 class="card-title">Stats at a Glance</h1>
      <div class="stats w-full">
        <div class="stat">
          <div class="stat-title">Kills</div>
          <div class="stat-value">{kills}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Deaths</div>
          <div class="stat-value">{deaths}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Wins</div>
          <div class="stat-value">{wins}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Ties</div>
          <div class="stat-value">{ties}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Losses</div>
          <div class="stat-value">{losses}</div>
        </div>
      </div>
    </div>
  </div>
</div>
