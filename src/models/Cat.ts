import { Column, CreatedAt, Model, Table, UpdatedAt } from 'sequelize-typescript'

export interface ICatAttributes {
  id?: number;
  name: string;
  description: string;
  temperament: string;
  origin: string;
  createdAt?: Date;
  updatedAt?: Date;
}


@Table
export class Cats extends Model<Cats> {

  @Column
  public name!: string;

  @Column
  public origin!: string;

  @Column
  public description!: string;

  @Column
  public temperament!: string;

  @CreatedAt
  @Column
  public createdAt!: Date;

  @UpdatedAt
  @Column
  public updatedAt!: Date;

}