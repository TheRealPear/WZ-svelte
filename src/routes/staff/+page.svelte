<script>
  import config from '$lib/config.json';
  import { onMount } from 'svelte';

  let staffRanks = [];
  let staffPlayers = {};
  let loading = true;
  /**
   * @type {string | null}
   */
  let error = null;

  onMount(async () => {
    try {
      // Fetch all ranks
      const ranksResponse = await fetch(config.API_BASE + '/mc/ranks');
      const allRanks = await ranksResponse.json();
      // Filter only for ranks marked as staff
      staffRanks = allRanks.filter(rank => rank.staff === true);
      // Sort by rank priority (descending order)
      staffRanks.sort((a, b) => b.priority - a.priority);
      // Fetch players for each rank
      for (const rank of staffRanks) {
        try {
          const playersResponse = await fetch(config.API_BASE + '/mc/ranks/' + rank._id + '/players');
          const allPlayers = await playersResponse.json();
          // Filter out Bedrock players
          const javaPlayers = (allPlayers || []).filter(
            player => !['.', '*'].includes(player.name.charAt(0))
          );
          staffPlayers[rank._id] = javaPlayers;
        } catch (err) {
          console.error(`Failed to load players for rank ${rank.name}:`, err);
          staffPlayers[rank._id] = [];
        }
      }
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

<div class="mx-auto max-sm:m-4 max-w-4xl [&_h1]:my-3 [&_h2]:my-3 [&_hr]:my-3">
  <hgroup>
    <h1 class="text-3xl font-extrabold">Staff</h1>
    <p class="text-base-content/90">The people who help keep the server running.</p>
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
        <div class="card bg-base-100 shadow-sm">
          <div class="card-body">
            <h2 class="card-title">
              <span class="text-2xl font-bold">{rank.displayName}</span>
              <span class="text-sm font-normal text-base-content/70">({staffPlayers[rank._id]?.length || 0})</span>
            </h2>
            {#if staffPlayers[rank._id] && staffPlayers[rank._id].length > 0}
              <div class="grid grid-cols-2 space-y-6 max-sm:grid-cols-1">
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
      {/each}
    </div>
  {/if}
</div>
