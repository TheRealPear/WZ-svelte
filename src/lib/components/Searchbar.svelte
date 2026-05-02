<script lang="ts">
  let search = '';
  let dialogElement: HTMLDialogElement;
  let showError = false;

  const handleSearch = async (event: SubmitEvent) => {
    event.preventDefault();
    const query = search.trim();
    if (!query) return;

    showError = false;

    try {
      const response = await fetch(`/p/${encodeURIComponent(query)}`);

      if (response.ok) {
        search = '';
        dialogElement?.close();
        location.href = `/p/${encodeURIComponent(query)}`;
      } else {
        showError = true;
      }
    } catch (error) {
      showError = true;
    }
  };
</script>

<dialog id="player_search" class="modal" bind:this={dialogElement}>
  <div class="modal-box">
    <button class="btn btn-circle btn-ghost absolute right-2 top-2" aria-label="Close" commandfor="player_search" command="close">✕</button>
    <h3 class="text-lg font-bold">Player Search</h3>
    <div class="py-4 flex justify-center">
      <form class="join" onsubmit={handleSearch}>
        <label class="input join-item">
          <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" placeholder="Search by username" minlength="2" maxlength="16" pattern="^[a-zA-Z0-9_]+$" aria-label="Search player" bind:value={search}/>
        </label>
        <button class="join-item btn btn-soft" aria-label="Enter" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
          </svg>
        </button>
      </form>
    </div>
    {#if showError}
      <p class="text-error">Player not found. Please check the username and try again.</p>
    {/if}
  </div>
  <!-- Invisible button to allow closing the modal by clicking out the box -->
  <button class="modal-backdrop" commandfor="player_search" command="close">Close</button>
</dialog>
