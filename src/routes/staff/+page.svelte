<script lang="ts">
  import type { PageData } from './$types';
  import Metadata from '$lib/components/Metadata.svelte';

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

  export let data: PageData;

  const staffRanks = (data.staffRanks ?? []) as Rank[];
  const staffPlayers = (data.staffPlayers ?? {}) as Record<string, Player[]>;
  const error = data.error;
</script>

<Metadata title="Staff" description="Meet the dedicated people who guide, support, and keep Warzone thriving." />

<div class="mx-auto max-w-5xl [&_h1]:my-3">
  <hgroup>
    <h1 class="text-3xl font-extrabold">Staff</h1>
    <div class="space-y-2">
      <p class="text-base-content/90">Meet the dedicated people who guide, support, and keep Warzone thriving.</p>
      <p class="text-base-content/90">We also honor our <a class="link" href="/retired">retired staff</a>, whose contributions helped shape the community.</p>
    </div>
  </hgroup>
  <div class="divider"></div>
  {#if error}
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
