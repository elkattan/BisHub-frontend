import light from "./themes/light";

module.exports = {
  modern: true,
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: "BisHub",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "BisHub a social platform for Helwan Bis Students"
      }
    ],
    link: []
  },
  /*
   ** Manifest
   */ manifest: {
    name: "BisHub",
    short_name: "BisHub",
    theme_color: "#0F111A",
    background_color: "#0C0E15",
    orientation: "portrait",
    icons: []
  },
  /*
   ** Modules
   */
  modules: [
    "@nuxtjs/pwa",
    "@nuxtjs/axios",
    "@nuxtjs/bulma",
    [
      "@nuxtjs/vuetify",
      {
        theme: {
          themes: { light }
        }
      }
    ],
    [
      "nuxt-vuex-localstorage",
      {
        localStorage: ["localization", "auth"]
      }
    ]
  ],
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   * CSS Files
   */
  css: ["~/assets/fonts/font.css"],
  /*
   * i18n Configuration
   */
  router: {
    middleware: "routeChanged"
  },
  plugins: ["~/plugins/i18n.js"],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
