// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Be Vietnam Pro",
      cssVariable: "--font-vietnam",
    },
  ],
  site: "https://david-henery4.github.io/",
  base: "Manage-Landing-Page/",
});
