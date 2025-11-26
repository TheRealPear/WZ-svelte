<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate, formatDateSimplified, formatHours } from '$lib/scripts/date';
  import { calculateLevel, formatXPProgress } from '$lib/scripts/pgm';
  export let data: PageData;

  const player = (data.player ?? {}) as any;
  const id = (player._id as string) ?? ''; // UUID for Minotar
  const name = (player.name as string) ?? 'Unknown';
  const firstJoinMs = (player.firstJoinedAt as number) ?? 1419033600000;
  const lastJoinMs = (player.lastJoinedAt as number) ?? 1419033600000;
  const stats = (player.stats ?? {}) as Record<string, any>;
  const exp = (stats.xp ?? 0) as number;
  const playTime = (stats.gamePlaytime ?? 0) as number;
  const kills = (stats.kills ?? 0) as number;
  const deaths = (stats.deaths ?? 0) as number;
  const wins = (stats.wins ?? 0) as number;
  const losses = (stats.losses ?? 0) as number;
  const ties = (stats.ties ?? 0) as number;
  const matches = (stats.matches ?? 0) as number;
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
            <div class="flex gap-1">
              <div class="badge badge-lg badge-primary">Rank</div>
              <div class="badge badge-lg badge-secondary">Rank</div>
            </div>
          </div>
          <!-- Right column -->
          <div class="flex flex-col justify-self-end items-center space-y-1">
            <div class="font-normal text-base-content/70">Level</div>
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
