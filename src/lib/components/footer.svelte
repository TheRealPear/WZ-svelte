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

  .footer > aside > img:hover {
  	-webkit-animation: spin 1.5s linear infinite;
  	-moz-animation: spin 1.5s linear infinite;
  	animation: spin 1.5s linear infinite;
  }
</style>

<footer class="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
  <aside>
    <img src="/img/warzone.svg" width="48" height="48" alt=""/>
    <p class="font-bold">
      &copy; {new Date().getUTCFullYear()} Warzone Network
    </p>
    <p>
      Not an official Minecraft service.
      <br />
      Not approved by or associated with Mojang or Microsoft
    </p>
    <p>
      Originally made by <a class="link link-hover" target="_blank" rel="noreferrer" href="https://github.com/lukechatton">Luke Chatton</a> in 2014.
    </p>
  </aside>
  <nav>
    <h6 class="footer-title">Site Map</h6>
    <a class="link link-hover" href="/">Home</a>
    <a class="link link-hover" href="/leaderboard">Leaderboard</a>
    <a class="link link-hover" href="/staff">Staff</a>
    <a class="link link-hover" href="/rules">Server Rules</a>
  </nav>
  <nav>
    <h6 class="footer-title">Useful Links</h6>
    <a class="link link-hover" target="_blank" rel="noreferrer" href="https://warz.one/discord">Discord</a>
    <a class="link link-hover" target="_blank" rel="noreferrer" href="https://twitter.com/WarzoneMC">Twitter</a>
    <a class="link link-hover" target="_blank" rel="noreferrer" href="https://github.com/Warzone/">GitHub</a>
  </nav>
  <nav>
    <h6 class="footer-title">Legal</h6>
    <!-- <a class="link link-hover">Terms of use</a> -->
    <a class="link link-hover" href="/privacy">Privacy Policy</a>
    <a class="link link-hover" href="/screenshare">Screenshare Policy</a>
  </nav>
</footer>
