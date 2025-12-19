<script lang="ts">
  import config from '$lib/config.json';
  import { onMount } from 'svelte';

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
      // Uncomment below to debug
      // console.log('API Response:', data);
      mapData = data;
    } catch (err) {
      error = 'Failed to load map data';
      console.error(err);
    } finally {
      loading = false;
    }
  });
</script>

<style>
  .image-full {
    > .card-body {
      color: white;
    }

    > figure img {
      filter: none;
    }
  }
</style>

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
    {#each mapData as map}
    <div class="hover-3d">
      <div class="card shadow image-full">
        <figure>
          <img class="object-cover" src={`https://raw.githubusercontent.com/TBG1000/MapImages/refs/heads/main/Maps/${map.name}/map.png`} alt="" loading="lazy" on:error={(e) => { const img = e.target as HTMLImageElement; img.onerror = null; img.src = '/img/map-fallback.png'; }}/>
        </figure>
        <div class="card-body justify-start h-2/5 bg-gradient-to-b from-neutral/60 to-transparent">
          <h2 class="card-title font-bold">{map.name}</h2>
        </div>
      </div>
      <!-- 8 empty divs needed for the 3D effect -->
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    {/each}
  </div>
{/if}
</div>
