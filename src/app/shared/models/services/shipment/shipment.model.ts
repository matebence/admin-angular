import {Status} from './status.model';
import {Invoice} from './invoice.model';
import {Courier} from '../../common/common.model';

export interface Shipment {
  _id: string,
  courier: Courier,
  parcelId: number,
  from: string,
  to: string,
  status: Status,
  price: number,
  express: boolean,
  invoice: Invoice,
  __v: number,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}
