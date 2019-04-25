import * as Sequelize from 'sequelize';
import { CatAttributes, CatInstance } from 'models/Cat';

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  Cat: Sequelize.Model<CatInstance, CatAttributes>;
}
