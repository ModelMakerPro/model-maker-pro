const files = require.context('.', false, /\.js$/)
let helpers = []
files.keys().forEach((key) => {
  if (key === './index.js') {
    return
  }
  helpers = [...helpers, ...files(key).default]
})

export default helpers
