<script lang="ts">
  import type { PageData } from './$types';
  import Metadata from '$lib/components/Metadata.svelte';

  interface LeaderboardEntry {
    id: string;
    name: string;
    score: number;
  }

  export let data: PageData;

  const pageTitle = 'Leaderboard';
  const pageDescription = 'The highest ranked players on Warzone.';
  const leaderboardData = (data.leaderboard ?? []) as LeaderboardEntry[];
  const error = data.error;
</script>

<Metadata title={pageTitle} description={pageDescription} />

<div class="mx-auto max-w-5xl w-full [&_h1]:my-3 [&_hr]:my-3">
  <hgroup>
    <h1 class="text-3xl font-extrabold">{pageTitle}</h1>
    <p class="text-base-content/90">{pageDescription}</p>
  </hgroup>
  <div class="divider"></div>
  {#if error}
    <p class="text-center text-error">{error}</p>
  {:else}
    <div class="overflow-x-auto">
      <table class="table table-md w-full">
        <thead>
          <tr>
            <th>Username</th>
            <th>Position</th>
            <th>XP</th>
          </tr>
        </thead>
        <tbody>
          {#each leaderboardData as entry, index}
            <tr class="hover:bg-base-300">
              <td>
                <div class="flex items-center gap-2">
                  <img class="size-8 rounded flex-shrink-0 shadow" src="https://minotar.net/helm/{entry.id}.svg" alt="" loading="lazy"/>
                  <a class="no-underline hover:underline" href="/p/{entry.name}">{entry.name}</a>
                </div>
              </td>
              <th>#{index + 1}</th>
              <td>{entry.score}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
