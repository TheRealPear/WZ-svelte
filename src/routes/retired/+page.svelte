<script lang="ts">
  import type { PageData } from './$types';
  import Metadata from '$lib/components/Metadata.svelte';

  function normalizeRoles(role: string | string[]): string[] {
    return Array.isArray(role) ? role : [role];
  }

  export let data: PageData;

  const retired = (data.retired ?? []).map(entry => ({
    ...entry,
    roles: entry.roles ?? normalizeRoles(entry.role)
  }));
  const error = data.error;
</script>

<Metadata title="Retired Staff" description="Honoring the people whose efforts laid the foundation for Warzone." />

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
  {#if error}
    <p class="mb-4 text-center text-error">{error}</p>
  {/if}
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
