export interface Role {
  roleId: number,
  rolePrivileges: any[],
  name: string,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}
