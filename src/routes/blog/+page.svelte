<script lang="ts">
  export let data;
  import Metadata from '$lib/components/Metadata.svelte';
</script>

<Metadata title="Blog" description="A collection of announcements and blog posts covering Warzone."/>

<div class="mx-auto max-w-5xl w-full">
  <hgroup>
    <h1 class="text-3xl font-extrabold my-3">Blog</h1>
    <p class="text-base-content/90">A collection of announcements and blog posts covering Warzone.</p>
  </hgroup>
  <div class="divider"></div>

  {#if !data.latest}
    <p class="text-center text-error">No posts are available right now. Check back later for updates.</p>
  {/if}
  {#if data.latest}
    <div class="card w-full shadow">
      <div class="card-body">
        <h2 class="card-title text-2xl font-extrabold">
          <a href="/blog/{data.latest.slug}">{data.latest.title}</a>
        </h2>
        <section>
          <div class="flex items-center gap-2">
            <img class="size-8 rounded flex-shrink-0 shadow" alt="" src={"https://minotar.net/helm/" + data.latest.author + ".svg"} fetchpriority="high"/>
            {data.latest.author}
            &bull;
            {new Date(data.latest.date).toLocaleDateString()}
          </div>
          <div class="divider"></div>
          <div class="prose max-w-none">
            {@html data.latest.body}
          </div>
        </section>
      </div>
    </div>
    <div class="card w-full shadow">
      <div class="card-body">
        <h2 class="card-title">All posts</h2>
        <ul class="list bg-base-100">
          {#each data.posts as post}
            <li class="list-row">
              <div>
                <a class="font-bold" href={`/blog/${post.slug}`}>{post.title}</a>
              </div>
              <div>
                <p>{post.description}</p>
              </div>
              <div>
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}
</div>
