import {Place} from './place.model';
import {Payout} from './payout.moel';
import {Payment} from './payment.model';

export interface User {
  userId: number,
  userName: string,
  email: string,
  accountId: number,
  places: Place,
  firstName: string,
  lastName: string,
  gender: string,
  balance: number,
  tel: string,
  img: string,
  payout: Payout,
  payment: Payment,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}
