import {Reason} from '../common/common.model';

export interface Error {
  timestamp: string,
  message: string,
  error: boolean
  reason?: Reason,
}
