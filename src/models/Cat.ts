import { Column, CreatedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';

export interface CatAttributes {
  id?: number;
  name: string;
  description: string;
  temperament: string;
  origin: string;
  createdAt?: Date;
  updatedAt?: Date;
};


@Table
export class Cats extends Model<Cats> {

  @Column
  name!: string;

  @Column
  origin!: string;

  @Column
  description!: string;

  @Column
  temperament!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}