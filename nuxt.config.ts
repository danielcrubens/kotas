// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Kotas - Pokedex',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
          charset: 'utf-8'
        }
      ],
    }
    },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
  ],
  components: true,
  css:
  [
    '@/assets/css/tailwind.css',
    '@/assets/css/global.css',
  ],
  pinia: {
    storesDirs: ['./stores/**']
  },
  
})
