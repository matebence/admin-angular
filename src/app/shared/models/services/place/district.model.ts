import {Region} from './region.model';

export interface District {
  id: number,
  name: string,
  vehRegNum: string,
  code: number,
  use: number,
  regionId: number,
  region: Region,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}
