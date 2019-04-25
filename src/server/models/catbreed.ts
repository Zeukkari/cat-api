import { Model, Column, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript'

@Table
export class CatBreed extends Model<CatBreed> {

  @Column
  name!: string

  @Column
  temperament?: string

  @Column
  description?: string

  @Column
  origin?: string

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date

}
