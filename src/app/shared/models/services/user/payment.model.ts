import {User} from './user.model';

export interface Payment {
  paymentId: number,
  users: number | User,
  creditCard: string,
  expMonth: number,
  expYear: number,
  cvc: number,
  charge: string,
  amount: number,
  currency: string,
  refunded: boolean,
  refund: string,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}
