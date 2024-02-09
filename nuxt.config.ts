// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  components: true,

  css:
    [
      '@/assets/css/tailwind.css',
      '@/assets/css/global.css',
    ],
})
