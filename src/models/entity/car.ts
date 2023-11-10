import { Model, ModelObject } from 'objection';
import knexInstance from '../../../config/postgresql';

export class CarEntity extends Model {
  id?: number;
  name!: string;
  rent_per_day!: number;
  size!: string;
  profile_picture_url?: string;

  static get tableName() {
    return 'cars';
  }
}

Model.knex(knexInstance);

export type Car = ModelObject<CarEntity>;