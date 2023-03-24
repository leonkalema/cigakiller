const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  plugins: [],
  corePlugins: {
    // Enable the `width` and `height` classes
    preflight: false,
    width: true,
    height: true,
  },
};

module.exports = config;