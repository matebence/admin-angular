import {Invoice} from './invoice.model';

export interface Shipment {
  _id: string,
  courier: any,
  parcelId: number,
  from: string,
  to: string,
  status: any,
  price: number,
  express: boolean,
  invoice: Invoice,
  __v: number,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}
