import {Parcel} from './parcel.model';

export interface Rating {
  id: number,
  description: number,
  rating: number,
  image: string,
  parcelId: number,
  parcel: Parcel,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}
