import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
  },

  preprocess: [
    preprocess({
      postcss: {
        plugins: [
          tailwindcss(),
          autoprefixer(),
        ],
      },
    }),
  ],
};

export default config;

