
import { Sequelize } from 'sequelize-typescript';
import { Cats } from './models/Cat';

export async function initDB() {
  const dbUrl = process.env.DATABASE_URL

  if (dbUrl === undefined) {
    throw 'ERROR: DATABASE_URL missing'
  }

  const db = new Sequelize(dbUrl);
  db.addModels([Cats])
  await db.sync({ force: false });
  return db
}
