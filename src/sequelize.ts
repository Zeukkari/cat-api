import { Sequelize } from 'sequelize-typescript'
import { CatBreed } from './server/models/catbreed'

export const sequelize = new Sequelize({
  database: 'db',
  dialect: 'postgres',
  username: '',
  password: '',
  storage: ':memory:',
  url: process.env.DATABASE_URL
})

sequelize.addModels([CatBreed])
