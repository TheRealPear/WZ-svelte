<script lang="ts">
  import config from '$lib/config.json';
  import Discord from 'virtual:icons/simple-icons/discord';
  import Twitter from 'virtual:icons/simple-icons/twitter';
  import GitHub from 'virtual:icons/simple-icons/github';
  import TikTok from 'virtual:icons/simple-icons/tiktok';
  import Instagram from 'virtual:icons/simple-icons/instagram';
</script>

<style lang="css">
  /* Animate the Warzone logo */
  @-moz-keyframes spin {
  	100% {
  		-moz-transform: rotate(360deg);
  	}
  }
  @-webkit-keyframes spin {
  	100% {
  		-webkit-transform: rotate(360deg);
  	}
  }
  @keyframes spin {
  	100% {
  		-webkit-transform: rotate(360deg);
  		transform: rotate(360deg);
  	}
  }

  img#hoverme:hover {
  	-webkit-animation: spin 1.5s linear infinite;
  	-moz-animation: spin 1.5s linear infinite;
  	animation: spin 1.5s linear infinite;
  }
</style>

<footer class="footer flex w-full flex-col bg-base-300 p-5 gap-y-4 sm:flex-row sm:items-center">
  <aside class="!flex w-full items-center !justify-center gap-2 sm:flex-1 sm:!justify-start">
    <img id="hoverme" src="/img/warzone.svg" width="32" height="32" alt="" class="shrink-0" />
    <p class="font-semibold text-xl">{config.NAME}</p>
  </aside>
  <nav class="flex w-full flex-col items-center gap-2 sm:flex-1 sm:flex-row sm:justify-center sm:gap-4">
    <a class="link link-hover" href="/">Home</a>
    <a class="link link-hover" href="/leaderboard">Leaderboard</a>
    <a class="link link-hover" href="/staff">Staff</a>
    <a class="link link-hover" href="/rules">Server Rules</a>
    <a class="link link-hover" href="/privacy">Privacy Policy</a>
    <a class="link link-hover" href="/screenshare">Screenshare Policy</a>
  </nav>
  <aside class="flex w-full items-center justify-center gap-4 sm:flex-1 sm:justify-end">
    <a class="link link-hover" title="Discord" target="_blank" href="https://warz.one/discord"><Discord class="size-5"/></a>
    <a class="link link-hover" title="Twitter" target="_blank" href="https://twitter.com/WarzoneMC"><Twitter class="size-5"/></a>
    <a class="link link-hover" title="Instagram" target="_blank" href="https://instagram.com/warzonemc"><Instagram class="size-5"/></a>
    <a class="link link-hover" title="TikTok" target="_blank" href="https://tiktok.com/@warzonemc"><TikTok class="size-5"/></a>
    <a class="link link-hover" title="GitHub" target="_blank" href="https://github.com/Warzone/"><GitHub class="size-5"/></a>
  </aside>
</footer>
<footer class="footer sm:footer-horizontal w-full justify-between gap-y-2 bg-base-300 text-base-content/50 border-base-100 border-t p-5">
  <aside>
    <p>&copy; {new Date().getUTCFullYear()} {config.NAME} Network &bull; Originally founded by <a class="link link-hover" target="_blank" rel="noreferrer" href="https://github.com/lukechatton">Luke Chatton</a> in 2014.</p>
  </aside>
  <aside>
    <p>Not an official Minecraft service. Not approved by or associated with Mojang or Microsoft.</p>
  </aside>
</footer>
