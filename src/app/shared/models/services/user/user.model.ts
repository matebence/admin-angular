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
}

export interface Place {
  placeId: number,
  country: string,
  region: string,
  district: string,
  place: string,
  street: string,
  zip: number,
  code: string,
}

export interface Payout {
  payoutId: number,
  users: number,
  iban: string,
  amount: number,
  accapted: boolean,
}

export interface Payment {
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
}
