<script lang="ts">
  export let data;
  import Metadata from '$lib/components/Metadata.svelte';
</script>

<Metadata title={data.post.title} description={data.post.description}/>

<article class="mx-auto max-w-5xl">
  <!-- TODO: add header background and stuff to make it stand out -->
  <header>
    <h1 class="text-3xl font-extrabold mb-3">{data.post.title}</h1>
    <hgroup>
      <div class="text-lg text-neutral-content">
        <div class="flex items-center gap-2">
          <img class="size-8 rounded flex-shrink-0 shadow" alt="" src={"https://minotar.net/helm/" + data.post.author + ".svg"} fetchpriority="high"/>
          <a class="hover:underline" href="/p/{data.post.author}">{data.post.author}</a>
          &bull;
          <time datetime="{data.post.date}">{new Date(data.post.date).toLocaleDateString(undefined, { dateStyle: "full", timeZone: "UTC" })}</time>
        </div>
      </div>
    </hgroup>
    <div class="divider"></div>
  </header>
  <div class="prose max-w-none">
    {@html data.post.body}
  </div>
</article>
