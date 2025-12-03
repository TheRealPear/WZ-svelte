<script lang="ts">
  import { page } from '$app/state';

  function goBack() {
    history.back();
  }
</script>

<svelte:head>
  <title>Error {page.status}</title>
</svelte:head>

<div class="card card-lg">
  <div class="card-body items-center text-center">
    <h2 class="card-title text-4xl">Error {page.status}</h2>
    <p>{page.error.message}</p>
    <div class="card-actions mt-6 justify-end">
      <button class="btn btn-ghost" type="button" onclick={goBack}>Go back</button>
      <a href="/" class="btn btn-primary">Go Home</a>
    </div>
  </div>
</div>
