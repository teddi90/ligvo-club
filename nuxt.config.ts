// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Ligvo Клуб настільних ігор',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1'
        },
    },
    css: [
        'bootstrap/dist/css/bootstrap.min.css',
        '~/assets/style/main.scss'
    ],
    build: {
        transpile: ["@vee-validate/nuxt"],
    },
    runtimeConfig: {
        public: {
            wpUri: process.env.WP_URI,
            telegramToken: process.env.TELEGRAM_TOKEN,
            telegramChatId: process.env.TELEGRAM_CHAT_ID,
        },
    },
    modules: [
        '@vee-validate/nuxt',
        '@pinia/nuxt',
        'nuxt-swiper',
        'nuxt-mapbox',
    ],
    pinia: {
        autoImports: ['defineStore',]
    },
    mapbox: {
        accessToken: 'pk.eyJ1IjoidGVkZGk5MCIsImEiOiJjbGxheDM0eG4wMWxrM2dxdTlhaGY4b2lnIn0.ms2aRxomlmpNGr-zErviXw'
    }
})
