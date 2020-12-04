require('dotenv').config();

const projectName = process.env.PROJECT_NAME;
const themeColor = `#${process.env.THEME_COLOR}`;
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'spa',
  // server: {
  //   port: process.env.PROT
  // },
  axios: {
    baseURL: 'https://conduit.productionready.io/api'
  },
  auth: {
    redirect: false,
    strategies: {
      local: {
        endpoints: false,
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    }
  },
  workbox: {
    offline: isProduction,
    offlineAnalytics: isProduction
  },
  manifest: {
    name: ' ',
    status: 'ok',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    short_name: projectName,
    THEME_COLOR: themeColor,
    background_color: themeColor,
    gcm_user_visible_only: true,
    gcm_sender_id: '103953800507'
  },
  head: {
    noscript: [
      { innerHTML: 'You need javascript to run!' }
    ],
    title: 'Arvan Challenges',
    base: { target: '_blank', href: '/' },
    meta: [
      { charset: 'utf-8' },

      { hid: 'og:title', property: 'og:title', content: '' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },

      { hid: 'keyword', property: 'keyword', content: '' },
      { hid: 'og:keyword', property: 'og:keyword', content: '' },

      { hid: 'description', name: 'description', content: '' },
      { hid: 'og:description', name: 'og:description', content: '' },

      { httpEquiv: 'Expires', content: '0' },
      { httpEquiv: 'Pragma', content: 'no-cache' },
      { httpEquiv: 'Cache-Control', content: 'no-cache, no-store, must-revalidate' },

      { property: 'og:type', content: 'website' },
      { property: 'og:name', content: projectName },
      { property: 'og:site_name', content: projectName },

      { name: 'theme-color', content: themeColor },
      { name: 'msapplication-navbutton-color', content: themeColor },

      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-touch-fullscreen', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },

      { name: 'apple-mobile-web-app-title', content: ' ' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/bootstrap.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/axios',
    '@/plugins/mixins',
    '@/plugins/filters',
    '@/plugins/vuelidate',
    '@/plugins/notification'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/google-gtag', // google analytics
    '@nuxtjs/eslint-module',
    '@nuxtjs/universal-storage',
    'bootstrap-vue/nuxt'
  ],

  /*
  ** Build configuration
  */
  build: {
    analyze: !isProduction,
    devtools: !isProduction,
    extractCSS: isProduction,

    filenames: {
      chunk: ({ isDev }) => isDev ? '[name].js' : '[id].[chunkhash].js',
      css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].css',
      app: ({ isDev }) => isDev ? '[name].js' : '[chunkhash].js'
    },

    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue|css)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        });
      }
    }
  }
};
