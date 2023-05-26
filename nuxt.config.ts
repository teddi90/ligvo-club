// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Ligvo club',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1'
        },
    },
    css: [
        'bootstrap/dist/css/bootstrap.min.css',
        '~/assets/style/main.scss'
    ],
    plugins: [
        '~/plugins/vueGoogleMaps.js',
    ],
    build: {
        transpile: ["@fawmi/vue-google-maps", "@vee-validate/nuxt"],
    },
    runtimeConfig: {
        public: {
            wpUri: process.env.WP_URI,
            googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
    },
    modules: [
        '@vee-validate/nuxt',
    ],
})
