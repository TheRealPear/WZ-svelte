<script lang="ts">
  import config from '$lib/config.json';
  import retiredRaw from '$lib/retired.json';
  import { onMount } from 'svelte';

  function normalizeRoles(role: string | string[]): string[] {
    return Array.isArray(role) ? role : [role];
  }

  let retired = retiredRaw.map(entry => ({
    ...entry,
    roles: normalizeRoles(entry.role)
  }));

  let loading = true;
  let error: string | null = null;

  const CACHE_KEY = 'retiredStaffUsernames';
  const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

  async function resolveUsernames() {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          console.log('Using cached usernames');
          retired = retired.map(entry => ({
            ...entry,
            username: parsed.data[entry.uuid] || entry.username
          }));
          loading = false;
          return;
        }
      }
      // Get current username from Mars
      const usernameMap: Record<string, string> = {};
      for (const entry of retired) {
        try {
          const res = await fetch(`${config.API_BASE}/mc/players/${entry.uuid}`);
          const data = await res.json();
          usernameMap[entry.uuid] = data.name;
        } catch (err) {
          console.error(`Failed to resolve username for ${entry.uuid}`, err);
          usernameMap[entry.uuid] = entry.username;
        }
      }
      retired = retired.map(entry => ({
        ...entry,
        username: usernameMap[entry.uuid]
      }));
      // Cache results
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: usernameMap, timestamp: Date.now() }));
    } catch (err) {
      error = 'Failed to resolve retired staff usernames';
      console.error(err);
    } finally {
      loading = false;
    }
  }

  onMount(resolveUsernames);
</script>

<svelte:head>
  <title>Retired Staff</title>
</svelte:head>

<div class="mx-auto max-w-5xl [&_h1]:my-3">
  <hgroup>
    <h1 class="text-3xl font-extrabold">Retired Staff</h1>
    <div class="space-y-4">
      <p class="text-base-content/90">Honoring the people whose efforts laid the foundation for Warzone.</p>
      <div role="alert" class="alert">
        <span>Please note this list is not complete. You can help by submitting updates via GitHub.</span>
      </div>
    </div>
  </hgroup>
  <div class="divider"></div>
  <div class="card bg-base-100 shadow-sm">
    <div class="card-body">
      <div class="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
        {#each retired as entry (entry.uuid)}
          <!-- Avatar & username are grouped together -->
          <a class="flex items-center gap-2" href="/p/{entry.username}">
            <img class="size-16 rounded flex-shrink-0 shadow-md/20" src="https://minotar.net/helm/{entry.uuid}.svg" alt="" loading="lazy"/>
            <div>
              <p class="text-lg font-semibold no-underline hover:underline">{entry.username}</p>
              <p class="text-md text-base-content/70">
                {entry.roles[0]}
                {#if entry.roles.length > 1}
                  <span class="badge badge-sm badge-ghost tooltip" data-tip={entry.roles.slice(1).join(', ')}>
                    +{entry.roles.length - 1}
                  </span>
                {/if}
              </p>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>
</div>
