<script lang="ts">
  import config from '$lib/config.json';
  import { onMount } from 'svelte';

  interface LeaderboardEntry {
    id: string;
    name: string;
    score: number;
  }

  let leaderboardData: LeaderboardEntry[] = [];
  let loading: boolean = true;
  let error: string | null = null;

  const CACHE_KEY = 'leaderboardData';
  const CACHE_TTL = 7200000; // 2 hours

  onMount(async () => {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          console.log('Using cached data');
          leaderboardData = parsed.data;
          loading = false;
          return;
        }
      }

      const response = await fetch(config.API_BASE + '/mc/leaderboards/XP/ALL_TIME');
      const data: LeaderboardEntry[] = await response.json();
      // Uncomment below to debug
      // console.log('API Response:', data);
      leaderboardData = data;
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (err) {
      error = 'Failed to load leaderboard data';
      console.error(err);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Leaderboard</title>
</svelte:head>

<div class="mx-auto max-sm:m-4 max-w-4xl w-full [&_h1]:my-3 [&_h2]:my-3 [&_hr]:my-3">
  <hgroup>
    <h1 class="text-3xl font-extrabold">Leaderboard</h1>
    <p class="text-base-content/90">The highest ranked players on Warzone.</p>
  </hgroup>
  <div class="divider"></div>
  {#if loading}
    <div class="text-center">
      <span class="loading loading-spinner loading-xl text-primary"></span>
      <p>Loading leaderboard...</p>
    </div>
  {:else if error}
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
