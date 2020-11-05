import {Region} from './region.model';
import {District} from './district.model';

export interface Village {
  id: 3,
  fullName: string,
  shortName: string,
  zip: string,
  use: number,
  regionId: number,
  districtId: number,
  region: Region,
  district: District,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}
