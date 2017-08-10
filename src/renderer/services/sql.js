const Sequelize = require('sequelize')
const requireFromString = require('require-from-string')
const path = require('path')
const fs = require('fs')
export const transform = (modelPath = '') => {
  let models = []
  if (modelPath) {
    let myTransform = {
      define: (name, model) => {
        console.log(name, model)
      }
    }
    let files = fs.readdirSync(modelPath)
    files.forEach((file) => {
      let filePath = path.resolve(modelPath, file)
      let fileContent = fs.readFileSync(filePath).toString()
      requireFromString(fileContent)(myTransform, Sequelize)
    })
  }
  return models
}
