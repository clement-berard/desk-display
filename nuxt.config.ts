// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      NODE_RED_PREFIX_URL: process.env.VITE_NODE_RED_PREFIX_URL,
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  experimental: { appManifest: false },
  imports: {
    autoImport: false,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },
  app: {
    head: {
      bodyAttrs: {
        class: 'dark',
      },
    },
  },
});
