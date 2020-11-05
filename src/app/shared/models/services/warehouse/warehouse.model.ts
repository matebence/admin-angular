export interface Warehouse {
  regions: Region[],
  _id: string,
  name: string,
  country: string,
  address: string,
  __v: number,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}

export interface Region {
  id: number,
  name: string
}
