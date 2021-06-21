module.exports = {
  "publicPath": "",

  // "pluginOptions": {
  //   "cordovaPath": "src-cordova"
  // },

  // "transpileDependencies": [
  //   "vuetify"
  // ],
 publicPath: process.env.NODE_ENV === 'production' ?
      '/buffalo_market_typescript/' :
      '/'
   
}
