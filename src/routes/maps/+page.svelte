<script lang="ts">
  import config from '$lib/config.json';
  import { onMount } from 'svelte';
  import MapCard from '$lib/components/MapCard.svelte';

  interface MapEntry {
    id: string;
    name: string;
    imageUrl: string;
  }

  let mapData: MapEntry[] = [];
  let loading: boolean = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const response = await fetch(config.API_BASE + '/mc/maps');
      const data: MapEntry[] = await response.json();
      mapData = data;
    } catch (err) {
      error = 'Failed to load map data';
      console.error(err);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Maps</title>
</svelte:head>

<div class="mx-auto max-w-4xl w-full [&_h1]:my-3">
  <hgroup>
    <h1 class="text-3xl font-extrabold">Maps</h1>
    <p class="text-base-content/90">View the expansive collection of maps currently available on Warzone.</p>
  </hgroup>
  <div class="divider"></div>
  {#if loading}
    <div class="text-center">
      <span class="loading loading-spinner loading-xl text-primary"></span>
      <p>Loading maps...</p>
    </div>
  {:else if error}
    <p class="text-center text-error">{error}</p>
  {:else}
    <div class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
      {#each mapData as mapEntry}
        <MapCard map={mapEntry} />
      {/each}
    </div>
  {/if}
</div>
