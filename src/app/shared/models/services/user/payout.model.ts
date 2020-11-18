export interface Payout {
  payoutId: number,
  users: any,
  iban: string,
  amount: number,
  accapted: boolean,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}
