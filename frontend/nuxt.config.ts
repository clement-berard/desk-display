// https://nuxt.com/docs/api/configuration/nuxt-config

const isDev = process.env.NODE_ENV === 'development';

export default defineNuxtConfig({
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
    '@hebilicious/vue-query-nuxt',
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
  nitro: {
    noExternals: !isDev,
    rollupConfig: !isDev
      ? {
          output: {
            inlineDynamicImports: true,
          },
        }
      : undefined,
    minify: !isDev,
    logLevel: 4, // Mode verbose
  },
});
