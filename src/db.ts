
import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript';
import { Cats } from './models/Cat';
dotenv.config()

const dbUrl = process.env.DATABASE_URL

if (dbUrl === undefined) {
  throw 'ERROR: DATABASE_URL missing'
}

export const db = new Sequelize({ url: dbUrl, logging: false });

export async function initDB() {
  db.addModels([Cats])
  await db.sync({ force: false });
  return db
}
