import {Category} from './category.model';
import {Place} from '../user/place.model';

export interface Parcel {
  id: number,
  sender: Sender,
  receiver: Reciver,
  length: number,
  width: number,
  height: number,
  weight: number,
  note: string,
  canceled: boolean,
  categoryId: number,
  category: Category,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}

export interface Sender {
  senderId: number,
  name: string,
  tel: string,
  balance: number,
  places: Place,
  userName: string,
  email: string
}

export interface Reciver {
  receiverId: number,
  name: string,
  tel: string,
  balance: number,
  places: Place,
  userName: string,
  email: string
}
