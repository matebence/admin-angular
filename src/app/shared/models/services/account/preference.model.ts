export interface Preference {
  preferenceId: number,
  accountPreferences: AccountPreference[],
  name: string,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  deleted: boolean
}

export interface AccountPreference {
  accounts: any,
  preferences: number,
  isSet: boolean,
  content: string,
  value: number
}
