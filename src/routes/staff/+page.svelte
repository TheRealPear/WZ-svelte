<script lang="ts">
  import config from '$lib/config.json';
  import { onMount } from 'svelte';

  interface Rank {
    _id: string;
    name: string;
    displayName: string;
    staff: boolean;
    priority: number;
  }

  interface Player {
    id: string;
    name: string;
  }

  let staffRanks: Rank[] = [];
  let staffPlayers: Record<string, Player[]> = {};
  let loading: boolean = true;
  let error: string | null = null;

  const CACHE_KEY = 'staffData';
  const CACHE_TTL = 24 * 60 * 60 * 1000; // 1 day

  onMount(async () => {
    try {
      // Check for cache
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          console.log('Using cached staff data');
          staffRanks = parsed.data.staffRanks;
          staffPlayers = parsed.data.staffPlayers;
          loading = false;
          return;
        }
      }

      // Fetch all ranks
      const ranksResponse = await fetch(config.API_BASE + '/mc/ranks');
      const allRanks: Rank[] = await ranksResponse.json();

      staffRanks = allRanks
        .filter(rank => rank.staff)
        .sort((a, b) => b.priority - a.priority)
        .map(({ _id, name, displayName, priority, staff }) => ({
          _id,
          name,
          displayName,
          priority,
          staff
        }));

      // Fetch players for each rank
      const playersByRank: Record<string, Player[]> = {};

      for (const rank of staffRanks) {
        try {
          const playersResponse = await fetch(config.API_BASE + '/mc/ranks/' + rank._id + '/players');
          const allPlayers: Player[] = await playersResponse.json();

          // Filter out Bedrock players
          const javaPlayers = (allPlayers || []).filter(
            player => !['.', '*'].includes(player.name.charAt(0))
          );
          playersByRank[rank._id] = javaPlayers;
        } catch (err) {
          console.error(`Failed to load players for rank ${rank.name}:`, err);
          playersByRank[rank._id] = [];
        }
      }
      staffPlayers = playersByRank;
      // Save to cache
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({data: { staffRanks, staffPlayers },timestamp: Date.now()}));
    } catch (err) {
      error = 'Failed to load staff data';
      console.error(err);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Staff</title>
</svelte:head>

<div class="mx-auto max-w-5xl [&_h1]:my-3">
  <hgroup>
    <h1 class="text-3xl font-extrabold">Staff</h1>
    <div class="space-y-2">
      <p class="text-base-content/90">Meet the dedicated people who guide, support, and keep Warzone thriving.</p>
      <p class="text-base-content/90">We also honor our <a class="link" href="/retired">retired staff</a>, whose contributions helped shape the community.</p>
    </div>
  </hgroup>
  <div class="divider"></div>
  {#if loading}
    <div class="text-center">
      <span class="loading loading-spinner loading-xl text-primary"></span>
      <p>Loading staff...</p>
    </div>
  {:else if error}
    <p class="text-center text-error">{error}</p>
  {:else}
    <div class="grid gap-4 max-sm:grid-cols-1 grid-cols-1">
      {#each staffRanks as rank (rank._id)}
      <section id={rank.name}>
        <div class="card bg-base-100 shadow-sm">
          <div class="card-body">
            <h2 class="card-title mb-2">
              <span class="text-2xl font-bold">{rank.displayName}</span>
              <span class="text-sm font-normal text-base-content/70">({staffPlayers[rank._id]?.length || 0})</span>
            </h2>
            {#if staffPlayers[rank._id] && staffPlayers[rank._id].length > 0}
              <div class="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
                <!-- Avatar & username are grouped together -->
                {#each staffPlayers[rank._id] as entry}
                  <a class="flex items-center gap-2" href="/p/{entry.name}">
                    <img class="size-16 rounded flex-shrink-0 shadow-md/20" src="https://minotar.net/helm/{entry.id}.svg" alt="" loading="lazy"/>
                    <p class="text-lg font-semibold no-underline hover:underline">{entry.name}</p>
                  </a>
                {/each}
              </div>
            {:else}
              <p class="text-sm text-base-content/60">No members</p>
            {/if}
          </div>
        </div>
      </section>
      {/each}
    </div>
  {/if}
</div>
