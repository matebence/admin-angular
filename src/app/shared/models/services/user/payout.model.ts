import {User} from './user.model';

export interface Payout {
  payoutId: number,
  users: number | User,
  iban: string,
  amount: number,
  accapted: boolean,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}
