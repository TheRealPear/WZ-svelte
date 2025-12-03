<svelte:head>
  <title>Warzone</title>
</svelte:head>

<header class="hero h-74 mx-auto bg-[url(/img/jumbotron-bg.webp)]">
  <div class="hero-overlay"><!-- Dummy div to make text readable --></div>
  <div class="hero-content text-center text-neutral-content flex flex-col">
    <h1 class="text-5xl font-bold">Warzone</h1>
    <!-- <p class="text-lg py-2">Take the objectives, destroy the enemy team, and dominate the competition!</p> -->
    <span class="text-rotate text-xl">
      <span class="justify-items-center">
        <span>Take the objectives</span>
        <span>Destroy the enemy team</span>
        <span>Dominate the competition</span>
      </span>
    </span>
    <div class="tooltip tooltip-bottom" data-tip="Click to copy">
      <button class="btn btn-accent">play.warzone.network</button>
    </div>
  </div>
</header>

<div class="mx-auto max-sm:m-4 max-w-4xl prose text-center [&_h1]:my-3 [&_h2]:my-3">
  <section>
    <h1 class="text-3xl">Our Story</h1>
    <p>Warzone was founded on December 20, 2014, by Luuke, just a month after launching Minehut. Created as a team-oriented PvP server, it quickly became a home for both casual players and competitive communities. We are proud to remain one of the oldest independent Minehut communities.</p>
    <p>Today, Warzone offers a constantly evolving library of more than a thousand maps across ten gamemodes. With a dynamic map pool and voting system, every match adapts to player activity, keeping gameplay fresh, balanced, and exciting.</p>
  </section>
  <section>
    <h1 class="text-3xl">Why Warzone?</h1>
    <!-- Cards -->
    <div class="mt-4 flex flex-col md:flex-row mx-auto gap-8">
      <div class="card bg-base-100 w-84 shadow-sm">
        <figure>
          <img src="/img/fg-open.webp" alt=""/>
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">Automated Matches</h2>
          <p>The server is always open for you to come on and practice your skills!</p>
        </div>
      </div>
      <div class="card bg-base-100 w-84 shadow-sm">
        <figure>
          <img src="/img/fg-match.webp" alt="Shoes" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">Match Details</h2>
          <p>Relive past matches with our detailed match tracking.</p>
        </div>
      </div>
      <div class="card bg-base-100 w-84 shadow-sm">
        <figure>
          <img src="/img/fg-player.webp" alt="Shoes" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">Player Stats</h2>
          <p>Comprehensive player stats that includes kill/death and win/loss ratio.</p>
        </div>
      </div>
    </div>
  </section>
  <section>
    <h1 class="text-3xl">Start Playing!</h1>
    <p>Warzone is open to all Minecraft: Java Edition players from version 1.7 through the latest release. Bedrock Edition players can join too, with limited support available through the Minehut proxy.</p>
    <div class="mt-4 flex flex-col md:flex-row gap-4 items-center justify-center">
      <div class="tooltip tooltip-bottom" data-tip="Click to copy">
        <button class="btn btn-accent">play.warzone.network</button>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="Click to copy">
        <button class="btn btn-neutral">warzone.bedrock.minehut.gg</button>
      </div>
    </div>
    <p>If you are not able to play right now, you can join us on <a href="https://warz.one/discord">Discord</a> to stay in touch.</p>
  </section>
</div>
