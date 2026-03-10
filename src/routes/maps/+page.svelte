<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import Metadata from '$lib/components/Metadata.svelte';
  import MapCard from '$lib/components/MapCard.svelte';

  interface MapEntry {
    id: string;
    name: string;
    imageUrl: string;
  }

  export let data: PageData;

  const BATCH_SIZE = 15;
  const pageTitle = 'Maps';
  const pageDescription = 'View the expansive collection of maps currently available on Warzone.';
  const mapData = (data.maps ?? []) as MapEntry[];
  let visibleMaps: MapEntry[] = mapData.slice(0, BATCH_SIZE);
  const error = data.error;

  function progressivelyRender(data: MapEntry[]) {
    let index = visibleMaps.length;

    function addBatch() {
      visibleMaps = [...visibleMaps, ...data.slice(index, index + BATCH_SIZE)];
      index += BATCH_SIZE;

      if (index < data.length) {
        requestAnimationFrame(addBatch);
      }
    }

    requestAnimationFrame(addBatch);
  }

  onMount(() => {
    if (mapData.length > visibleMaps.length) {
      progressivelyRender(mapData);
    }
  });
</script>

<Metadata title={pageTitle} description={pageDescription} />

<div class="mx-auto max-w-4xl w-full [&_h1]:my-3">
  <hgroup>
    <h1 class="text-3xl font-extrabold">{pageTitle}</h1>
    <p class="text-base-content/90">{pageDescription}</p>
  </hgroup>
  <div class="divider"></div>
  {#if error}
    <p class="text-center text-error">{error}</p>
  {:else}
    <div class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
      {#each visibleMaps as mapEntry}
        <MapCard map={mapEntry} />
      {/each}
    </div>
  {/if}
</div>
