import {Action} from '@ngrx/store';
import {User} from "../model/user.model";

export enum AuthActionTypes {
  LoginAction = '[Login] Action',
  LogoutAction = '[Logout] Action',
}

export class LoginAction implements Action {
  constructor(public  payload: { user: User }) {
  }

  readonly type: string = AuthActionTypes.LoginAction.toString();
}

export class LogoutAction implements Action {
  constructor(public  payload?: { user: User }) {
  }
  readonly type: string = AuthActionTypes.LogoutAction.toString();
}

export type AuthActionsTypes = LoginAction | LogoutAction;
