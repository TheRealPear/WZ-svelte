import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit({ preprocess: vitePreprocess(), adapter: adapter() }),
    tailwindcss(),
    Icons({ compiler: 'svelte', autoInstall: true })
  ]
});
