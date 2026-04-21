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
    app: {
        head: {
            meta: [
                {name: "msvalidate.01", content: "B1770426134CE11DD3EBBF61688F75E9"},
                {name: 'google-site-verification', content: 'AL-uVwyMKMbFigjk04pCJQBgSiuzRcB0M0Pd4_52H9k'}
            ]
        },
    },
})