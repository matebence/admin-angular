export interface User {
  '@id': number,
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
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  payout: Payout,
  payment: Payment,
  deleted: boolean,
  '_links': Hateoas
}

export interface Place {
  '@id': number,
  placeId: number,
  users: number,
  country: string,
  region: string,
  district: string,
  place: string,
  street: string,
  zip: number,
  code: string,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}

export interface Payout {
  '@id': number,
  payoutId: number,
  users: number,
  iban: string,
  amount: number,
  accapted: boolean,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}

export interface Payment {
  '@id': number,
  paymentId: number,
  users: number,
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

export interface Hateoas {
  self: { href: string },
  'all-users': { href: string }
}
