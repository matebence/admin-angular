import {Role} from './role.model';

export interface Account {
  accountId: number,
  login: Login,
  accountRoles: Role[],
  userName: string,
  email: string,
  password: string,
  activated: boolean,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}

export interface Login {
  loginId: number,
  accounts: number,
  lastLogin: string,
  ipAddress: string,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}
