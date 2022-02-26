import { Action } from '@ngrx/store';

export const SIGNUP_START = '[AUTH] SIGNUP START';
export const LOGIN_START = '[AUTH] LOGIN START';
export const AUTHENTICATE_SUCCESS = '[AUTH] AUTHENTICATE SUCCESS';
export const AUTHENTICATE_FAIL = '[AUTH] AUTHENTICATE FAIL';
export const LOGOUT = '[AUTH] LOGOUT';
export const AUTO_LOGIN = '[AUTH] AUTO LOGIN';
export const CLEAR_ERROR = '[AUTH] CLEAR ERROR';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class SignUpStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticationFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: { errorMessage: string }) {}
}

export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | SignUpStart
  | AuthenticationFail
  | ClearError
  | AutoLogin;
