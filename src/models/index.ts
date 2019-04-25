import Sequelize from 'sequelize';
import { DbInterface } from '../typings/DbInterface';
import { CatFactory } from './Cat';

export const createModels = (sequelizeConfig: any): DbInterface => {
  const sequelize = new Sequelize(sequelizeConfig);

  const db: DbInterface = {
    sequelize,
    Sequelize,
    Cat: CatFactory(sequelize, Sequelize)
  };

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};
