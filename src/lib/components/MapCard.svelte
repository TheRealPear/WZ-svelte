<script lang="ts">
  export let map;
</script>

<style>
  .image-full {
    > figure img {
      filter: none;
    }
  }
</style>

<!-- each card size is 288x244.3 -->

<div class="card shadow image-full relative overflow-hidden">
  <figure>
    <img class="object-cover" src={`https://raw.githubusercontent.com/TheRealPear/MapScraper/refs/heads/main/Maps/${map.name}/map.png`} alt="" loading="lazy" fetchpriority="low" decoding="async" on:error={(e) => { const img = e.target as HTMLImageElement; img.onerror = null; img.src = '/img/map-fallback.png'; }}/>
  </figure>
  <div class="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-black/70 to-transparent pointer-events-none"><!-- dummy div to add background to make card-body readable --></div>
  <div class="card-body relative">
    <h2 class="card-title text-[#fff] text-xl font-bold">{map.name}</h2>
  </div>
</div>
