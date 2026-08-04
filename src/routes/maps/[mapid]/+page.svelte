<script lang="ts">
    import type { PageData } from './$types';
    import Metadata from '$lib/components/Metadata.svelte';
    import { displayGamemode, formatMatchTime } from '$lib/scripts/pgm';
    export let data: PageData;

    const map = (data.map ?? {}) as any;
    const records = map.records ?? {};

    // Map details
    const mapName = map.name ?? 'Unknown';
    const gameType = displayGamemode[map.gamemodes[0] as keyof typeof displayGamemode]?.long ?? 'Unknown';
    const mostRecentMatch = map.lastMatchId ?? null;
    const highestKillstreak = records.highestKillstreak ?? null;
    const longestProjectileKill = records.longestProjectileKill ?? null;
    const fastestWoolCapture = records.fastestWoolCapture ?? null;
    const fastestFlagCapture = records.fastestFlagCapture ?? null;
    const fastestFirstBlood = records.fastestFirstBlood ?? null;
    const mostKills = records.killsInMatch ?? null;
    const mostDeaths = records.deathsInMatch ?? null;
</script>

<Metadata title={mapName}/>

<div class="mx-auto max-w-5xl w-full space-y-4 [&_.card]:bg-base-100">
  <!-- Map info card -->
  <div class="card w-full shadow">
    <div class="card-body">
      <h1 class="card-title text-2xl">{mapName}</h1>
      <p class="text">{gameType}</p>
    </div>
  </div>
  <!-- Map records card -->
  <div class="card w-full shadow">
    <div class="card-body">
      <h2 class="card-title">Map Records</h2>
      {#if !Object.values(records).every(v => v === null)}
      <!-- Check if the map actually has records before proceeding. Not all maps will have the same records, hence the extra if statements -->
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Record</th>
                <th>Username</th>
                <th>Value</th>
                <th>Match</th>
              </tr>
            </thead>
            <tbody>
              {#if highestKillstreak}
                <tr class="hover:bg-base-200">
                  <td class="font-bold">Highest Kill Streak</td>
                  <td>
                    <a class="flex items-center gap-2" href="/p/{highestKillstreak.player.name}">
                      <img class="size-8 rounded flex-shrink-0 shadow" src="https://minotar.net/helm/{highestKillstreak.player.id}.svg" alt="" loading="lazy"/>
                      <span class="no-underline hover:underline">{highestKillstreak.player.name}</span>
                    </a>
                  </td>
                  <td>{highestKillstreak.value} kills</td>
                  <td><a class="link" href="/m/{highestKillstreak.matchId}">View Match</a></td>
                </tr>
              {/if}
              {#if longestProjectileKill}
                <tr class="hover:bg-base-200">
                  <td class="font-bold">Longest Projectile Kill</td>
                  <td>
                    <a class="flex items-center gap-2" href="/p/{longestProjectileKill.player.name}">
                      <img class="size-8 rounded flex-shrink-0 shadow" src="https://minotar.net/helm/{longestProjectileKill.player.id}.svg" alt="" loading="lazy"/>
                      <span class="no-underline hover:underline">{longestProjectileKill.player.name}</span>
                    </a>
                  </td>
                  <td>{longestProjectileKill.distance} blocks</td>
                  <td><a class="link" href="/m/{longestProjectileKill.matchId}">View Match</a></td>
                </tr>
              {/if}
              {#if fastestWoolCapture}
                <tr class="hover:bg-base-200">
                  <td class="font-bold">Fastest Wool Capture</td>
                  <td>
                    <a class="flex items-center gap-2" href="/p/{fastestWoolCapture.player.name}">
                      <img class="size-8 rounded flex-shrink-0 shadow" src="https://minotar.net/helm/{fastestWoolCapture.player.id}.svg" alt="" loading="lazy"/>
                      <span class="no-underline hover:underline">{fastestWoolCapture.player.name}</span>
                    </a>
                  </td>
                  <td>{fastestWoolCapture.value ? formatMatchTime(fastestWoolCapture.value) : 'N/A'}</td>
                  <td><a class="link" href="/m/{fastestWoolCapture.matchId}">View Match</a></td>
                </tr>
              {/if}
              {#if fastestFlagCapture}
                <tr class="hover:bg-base-200">
                  <td class="font-bold">Fastest Flag Capture</td>
                  <td>
                    <a class="flex items-center gap-2" href="/p/{fastestFlagCapture.player.name}">
                      <img class="size-8 rounded flex-shrink-0 shadow" src="https://minotar.net/helm/{fastestFlagCapture.player.id}.svg" alt="" loading="lazy"/>
                      <span class="no-underline hover:underline">{fastestFlagCapture.player.name}</span>
                    </a>
                  </td>
                  <td>{fastestFlagCapture.value ? formatMatchTime(fastestFlagCapture.value) : 'N/A'}</td>
                  <td><a class="link" href="/m/{fastestFlagCapture.matchId}">View Match</a></td>
                </tr>
              {/if}
              {#if fastestFirstBlood}
                <tr class="hover:bg-base-200">
                  <td class="font-bold">Fastest First Blood</td>
                  <td>
                    <a class="flex items-center gap-2" href="/p/{fastestFirstBlood.attacker.name}">
                      <img class="size-8 rounded flex-shrink-0 shadow" src="https://minotar.net/helm/{fastestFirstBlood.attacker.id}.svg" alt="" loading="lazy"/>
                      <span class="no-underline hover:underline">{fastestFirstBlood.attacker.name}</span>
                    </a>
                  </td>
                  <td>{fastestFirstBlood.time ? formatMatchTime(fastestFirstBlood.time) : 'N/A'}</td>
                  <td><a class="link" href="/m/{fastestFirstBlood.matchId}">View Match</a></td>
                </tr>
              {/if}
              {#if mostKills}
                <tr class="hover:bg-base-200">
                  <td class="font-bold">Most Kills</td>
                  <td>
                    <a class="flex items-center gap-2" href="/p/{mostKills.player.name}">
                      <img class="size-8 rounded flex-shrink-0 shadow" src="https://minotar.net/helm/{mostKills.player.id}.svg" alt="" loading="lazy"/>
                      <span class="no-underline hover:underline">{mostKills.player.name}</span>
                    </a>
                  </td>
                  <td>{mostKills.value} kills</td>
                  <td><a class="link" href="/m/{mostKills.matchId}">View Match</a></td>
                </tr>
              {/if}
              {#if mostDeaths}
                <tr class="hover:bg-base-200">
                  <td class="font-bold">Most Deaths</td>
                  <td>
                    <a class="flex items-center gap-2" href="/p/{mostDeaths.player.name}">
                      <img class="size-8 rounded flex-shrink-0 shadow" src="https://minotar.net/helm/{mostDeaths.player.id}.svg" alt="" loading="lazy"/>
                      <span class="no-underline hover:underline">{mostDeaths.player.name}</span>
                    </a>
                  </td>
                  <td>{mostDeaths.value} deaths</td>
                  <td><a class="link" href="/m/{mostDeaths.matchId}">View Match</a></td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
      {:else}
        <p class="text-center text-error">This map has no available statistics.</p>
      {/if}
    </div>
  </div>
</div>
