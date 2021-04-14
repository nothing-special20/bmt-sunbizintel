module.exports = {
  configureWebpack: {
    plugins: [],
    externals: {
      config: JSON.stringify({
        apiURL: 'http://localhost:3000'
      })
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.configureWebpack.externals = {
  	config: JSON.stringify({
  	    apiURL: '/api'
    })
  }
}
