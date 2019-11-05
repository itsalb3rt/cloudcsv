module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/cloudcsv/'
  : '/',
  
  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
