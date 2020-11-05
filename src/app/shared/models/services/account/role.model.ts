import {Privilege} from './privilege.model';

export interface Role {
  roleId: number,
  rolePrivileges: Privilege[],
  name: string,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}
