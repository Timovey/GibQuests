import colors from 'vuetify/es5/util/colors'
export default {
  basePath: ' ./',
  ssr: false,
  target: 'server',
  head: {
    titleTemplate: '%s - client',
    title: 'client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '~/node_modules/leaflet/dist/leaflet.css',
    "~/static/style/main.css",
    "~/node_modules/vue-wysiwyg/dist/vueWysiwyg.css",
  ],

  plugins: [
    '~/plugins/wysiwyg.js',
    { src: '~plugins/leaflet.js', ssr: false }
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: 'http://localhost:8000',
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      primary: colors.deepPurple.accent4,
      themes: {
        light: {
          primary: colors.deepPurple.accent4
        }
      }
    }
  },

  build: {
    publicPath: '',
    basePath: './',
    extend(config, ctx) {}
  },
}
