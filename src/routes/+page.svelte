<script lang="ts">
  import FeatureGrid from "$lib/components/FeatureGrid.svelte";

  async function copyButton(e: MouseEvent) {
    const btn = e.currentTarget;
    const tooltip = btn.closest('.tooltip') || btn;
    const orig = tooltip.getAttribute('data-tip') ?? 'Click to copy';
    const text = btn.textContent.trim();

    try {
      await navigator.clipboard.writeText(text);
      tooltip.setAttribute('data-tip', 'Copied!');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); tooltip.setAttribute('data-tip', 'Copied!'); } finally { document.body.removeChild(ta); }
    }

    setTimeout(() => tooltip.setAttribute('data-tip', orig), 1500);
  }
</script>

<svelte:head>
  <title>Warzone</title>
</svelte:head>

<header class="hero h-74 mx-auto bg-[url(/img/jumbotron-bg.webp)]">
  <div class="hero-overlay"><!-- Dummy div to make text readable --></div>
  <div class="hero-content text-center text-neutral-content flex flex-col">
    <h1 class="text-5xl font-bold">Warzone</h1>
    <span class="text-rotate text-xl">
      <span class="justify-items-center">
        <span>Take the objectives</span>
        <span>Destroy the enemy team</span>
        <span>Dominate the competition</span>
      </span>
    </span>
    <div class="tooltip tooltip-bottom" data-tip="Click to copy">
      <button class="btn btn-accent" on:click={copyButton}>play.warzone.network</button>
    </div>
  </div>
</header>

<div class="mx-auto max-sm:m-2 max-w-4xl prose text-center [&_h1]:my-3 [&_h2]:my-3">
  <section>
    <h2 class="text-3xl font-extrabold">Our Story</h2>
    <p>Warzone was founded on December 20, 2014, by Luuke, just a month after launching Minehut. Created as a team-oriented PvP server, it quickly became a home for both casual players and competitive communities. We are proud to remain one of the oldest independent Minehut communities.</p>
    <p>Today, Warzone offers a constantly evolving library of more than a thousand maps across ten gamemodes. With a dynamic map pool and voting system, every match adapts to player activity, keeping gameplay fresh, balanced, and exciting.</p>
  </section>
  <section>
    <h2 class="text-3xl font-extrabold">Why Warzone?</h2>
    <!-- Cards -->
    <FeatureGrid />
  </section>
  <section>
    <h2 class="text-3xl font-extrabold">Start Playing!</h2>
    <p>Warzone is open to all Minecraft: Java Edition players from version 1.7 through the latest release. Bedrock Edition players can join too, with limited support available through the Minehut proxy.</p>
    <div class="mt-4 flex flex-col md:flex-row gap-4 items-center justify-center">
      <div class="tooltip tooltip-bottom" data-tip="Click to copy">
        <button class="btn btn-accent" on:click={copyButton}>play.warzone.network</button>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="Click to copy">
        <button class="btn btn-neutral" on:click={copyButton}>warzone.bedrock.minehut.gg</button>
      </div>
    </div>
    <p>If you are not able to play right now, you can join us on <a href="https://warz.one/discord">Discord</a> to stay in touch.</p>
  </section>
</div>
