<script lang="ts">
    import type { PageData } from './$types';
    import Metadata from '$lib/components/Metadata.svelte';
    export let data: PageData;

    const map = (data.map ?? {}) as any;

    // Map details
    const mapName = map.name ?? 'Unknown';
    const mostRecentMatch = map.lastMatchId ?? null;


</script>

<Metadata title={mapName}/>

<h1>{mapName}</h1>
<p class="prose"><a href="/m/{mostRecentMatch}">Last match on this map</a></p>
