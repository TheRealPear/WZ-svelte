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
    <h2 class="card-title text-3xl">Error {page.status}</h2>
    <p>{page.error.message}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary" type="button" onclick={goBack}>Go back</button>
      <a href="/" class="btn btn-ghost">Go Home</a>
    </div>
  </div>
</div>
