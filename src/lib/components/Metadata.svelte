<script lang="ts">
  import { page } from '$app/state';
  import config from '$lib/config.json';

  const DEFAULT_DESCRIPTION =
    'Warzone offers objective-based Minecraft PvP with a huge map pool, dynamic gameplay, and a long-running community.';

  export let title: string | null | undefined = undefined;
  export let description: string | null | undefined = undefined;

  $: pageName = title?.trim() ?? '';
  $: resolvedDescription = description?.trim() || DEFAULT_DESCRIPTION;
  $: isHome = page.url.pathname === '/';
  $: fullTitle = isHome || !pageName ? config.NAME : `${pageName} - ${config.NAME}`;
  $: canonicalUrl = `${page.url.origin}${page.url.pathname}`;
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={resolvedDescription} />
  <link rel="canonical" href={canonicalUrl} />

  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={resolvedDescription} />
  <meta property="og:site_name" content={config.NAME} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content={`@${config.TWITTER}`} />

  <meta name="theme-color" content="#9148D3">
</svelte:head>
