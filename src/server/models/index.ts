const fs = require('fs')
const path = require('path')
import { Sequelize } from 'sequelize-typescript'
const basename = path.basename(module.filename)
//const env = process.env.NODE_ENV || 'development'
const env = 'development'

const config = require('../config/config').default[env]

let db: any
db = {}

let sequelize: any
sequelize = new Sequelize(process.env[config.use_env_variable] || '')

fs.readdirSync(__dirname)
  .filter(
    (file: any) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file: any) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName: any) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
