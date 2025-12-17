<script lang="ts">
  import config from '$lib/config.json';
  import navigation from '$lib/navigation';
</script>

<nav class="navbar bg-base-200 shadow-sm">
  <div class="navbar-start">
    <!-- Mobile version -->
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"/></svg>
      </div>
      <ul role="list" class="menu menu-md dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {#each navigation as route}
          <li><a href="{route.href}"><svelte:component this={route.icon}/>{route.label}</a></li>
        {/each}
      </ul>
    </div>
    <!-- Branding -->
    <a class="btn btn-ghost text-xl" href="/">
      <img src="/img/warzone.svg" width="32" height="32" class="gap-1" alt=""/>
      {config.NAME}
    </a>
  </div>
  <!-- Desktop version -->
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      {#each navigation as route}
        <li><a href="{route.href}"><svelte:component this={route.icon}/>{route.label}</a></li>
      {/each}
    </ul>
  </div>
  <div class="navbar-end">
    <!-- Search bar -->
    <label class="input max-sm:hidden">
      <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input type="search" placeholder="Search player"/>
    </label>
  </div>
</nav>
