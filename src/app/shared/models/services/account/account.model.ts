import {Reason} from '../../common/common.model';

export interface SignIn {
  access_token: string,
  token_type: string,
  refresh_token: string,
  expires_in: number,
  scope: string,
  account_id: number,
  user_name: string,
  jti: string
}

export interface SignUp {
  timestamp: string,
  message: string,
  error: boolean,
  reason: Reason,
  nav: Hateoas
}

export interface SignOut {
  timestamp: string,
  message: string,
  error: boolean,
  reason: Reason,
  nav: Hateoas
}

export interface ForgetPassword {
  timestamp: string,
  message: string,
  error: boolean,
  reason: Reason,
  nav: Hateoas
}

export interface Recover {
  timestamp: string,
  message: string,
  error: boolean,
  reason: Reason,
  nav: Hateoas
}

export interface Activation {
  timestamp: string,
  message: string,
  error: boolean,
  reason: Reason,
  nav: Hateoas
}

export interface Hateoas {
  signin?: string,
  forgetpassword?: string,
  signup?: string,
  home?: string
}
