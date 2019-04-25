import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface CatAttributes {
  id?: number;
  name: string;
  description: string;
  temperament: string;
  origin: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface CatInstance extends Sequelize.Instance<CatAttributes>, CatAttributes {

};

export const CatFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<CatInstance, CatAttributes> => {
  const attributes: SequelizeAttributes<CatAttributes> = {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    origin: {
      type: DataTypes.STRING
    },
    temperament: {
      type: DataTypes.STRING
    }
  };

  const Cat = sequelize.define<CatInstance, CatAttributes>('Cat', attributes);

  Cat.associate = models => {
  };

  return Cat;
};
