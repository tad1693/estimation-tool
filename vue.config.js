// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a fileURL named `src/variables.scss`
        data: `@import "@/scss/main.scss";`
      }
    }
  }
}
