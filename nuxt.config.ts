// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxt/content',
        '@pinia/nuxt',
    ],
    css: ['~/assets/css/mybulma.css'],
    build: {
        transpile: ['@vuepic/vue-datepicker']
    },
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    experimental: {
        serverAppConfig: false,
    },
})