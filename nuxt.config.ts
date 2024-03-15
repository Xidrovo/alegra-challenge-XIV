export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY,
      alegraApiKey: process.env.ALEGRA_TOKEN_KEY
    },
    private: {
      unsplashSecretKey: process.env.UNSPLASH_SECRET_KEY
    }
  }
})
