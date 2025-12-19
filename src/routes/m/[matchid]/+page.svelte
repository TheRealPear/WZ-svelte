<script lang="ts">
  import type { PageData } from './$types';
  import { gamemodes, getElapsedMatchTime, formatMatchTime } from '$lib/scripts/pgm';
  import Clock from '~icons/heroicons/clock';
  export let data: PageData;

  const match = (data.match ?? {}) as any;

  // Map name and gamemode
  const mapName = match.level.name ?? 'Unknown';
  const gameType = gamemodes[match.level.gamemodes[0] as keyof typeof gamemodes] ?? 'Unknown';

  // Format match date for display
  var dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  const matchDate = new Date(match.loadedAt).toLocaleDateString('en-US', dateOptions as any) ?? 'Unknown';
  const participants = Object.values(match.participants);
</script>

<svelte:head>
  <title>Match Results</title>
</svelte:head>

<div class="mx-auto max-w-5xl w-full space-y-4">
  <!-- Basic match details -->
  <div class="card w-full shadow">
    <div class="card-body">
      <div class="grid grid-cols-2 gap-4 items-center">
        <!-- Left cell -->
        <div class="space-y-1">
          <h1 class="card-title text-2xl">{mapName}</h1>
          <p class="text">{gameType}</p>
        </div>
        <!-- Right cell -->
        <div class="text-right space-y-1">
          <p class="inline-flex items-center text-2xl text-gray-500 gap-1">
            <Clock class="size-6 leading-none" />
            {formatMatchTime(getElapsedMatchTime(match))}
          </p>
          <p class="text">{matchDate}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- Participants -->
  <div class="card w-full shadow">
    <div class="card-body">
      <!-- <h2 class="card-title">Participants</h2> -->
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
          <tr>
            <th>Username</th>
            {#if gameType !== 'Free For All'}<th>Team</th>{/if}
            <th>Kills</th>
            <th>Deaths</th>
          </tr>
        </thead>
          <tbody>
            {#each participants as entry}
              <tr class="hover:bg-base-300">
                <td>
                  <div class="flex items-center gap-2">
                    <img class="size-8 rounded flex-shrink-0 shadow" src="https://minotar.net/helm/{entry.id}.svg" alt=""/>
                    <a class="no-underline hover:underline" href="/p/{entry.name}">{entry.name}</a>
                  </div>
                </td>
                {#if gameType !== 'Free For All'}<td>{entry.lastPartyName}</td>{/if}
                <td>{entry.stats.kills}</td>
                <td>{entry.stats.deaths}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
