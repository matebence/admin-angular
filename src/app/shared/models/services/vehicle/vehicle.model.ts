import {Type} from './type.model';
import {Courier} from '../../common/common.model';

export interface Vehicle {
  _id: string,
  name: string,
  courier: Courier,
  type: Type,
  __v: number,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}
