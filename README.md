# Warzone Website

Warzone's website is powered by Svelte + SvelteKit as well as TailwindCSS + DaisyUI for styling. This ties in with our in-house [Mars API project](https://github.com/Warzone/mars-api-rs) to display detailed information such as individual players' statistics and match information.

## Contributing

### Setup

1. Set up the [Mars API](https://github.com/Warzone/mars-api-rs) and a (Sport)Paper server running [PGM](https://github.com/PGMDev/PGM) and [Mars client plugin](https://github.com/Warzone/mars) configured.
2. Make sure to have the latest version of [Node.js LTS](https://nodejs.org/en/download) installed. Run `npm install` in the project's directory to install the dependencies.
3. Modify `/src/lib/config.json` to your liking.
4. Start the development server with `npm run dev`. You can also build with `npm run build`.
    * Default server link is http://localhost:5173/

## Contributor Notes

* The site was not designed with self-hosting as the top priority. With that in mind, we've taken some steps to centralize important settings in the `config.json` file described in the setup guide.
* This project uses [EditorConfig](https://editorconfig.org/) to standardize coding styles across files.
    * We recommend installing the EditorConfig plugin for your preferred text editor. Some editors, including GitHub's online editor, already support it.
* All contributions should follow American (US) English grammar rules and spelling.
