<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/components/navbar.svelte'
  import Footer from '$lib/components/footer.svelte'
  import { page } from '$app/state';

  let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-base-200">
  <Navbar />
  <main class="flex-grow {page.url.pathname === '/' ? 'pb-8' : 'px-4 max-sm:py-4 py-8'}"> <!-- normalizes margins & padding from mobile to desktop -->
    {@render children()}
  </main>
  <Footer />
</div>
