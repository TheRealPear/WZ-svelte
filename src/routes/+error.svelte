<script lang="ts">
  import { page } from '$app/state';
  import Metadata from '$lib/components/Metadata.svelte';
  import ArrowLeft from 'virtual:icons/heroicons/arrow-left';
  import Home from 'virtual:icons/heroicons/home';

  $: pageTitle = `Error ${page.status}`;
  $: pageDescription = page.error?.message || 'An unknown error occurred';

  function goBack() {
    history.back();
  }
</script>

<Metadata title={pageTitle} description={pageDescription} />

<div class="card card-lg">
  <div class="card-body items-center text-center">
    <h2 class="card-title text-4xl">{pageTitle}</h2>
    <p>{pageDescription}</p>
    <div class="card-actions mt-6 justify-end">
      <button class="btn btn-ghost" type="button" onclick={goBack}><ArrowLeft />Go back</button>
      <a href="/" class="btn btn-primary"><Home />Go Home</a>
    </div>
  </div>
</div>
