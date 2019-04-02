import {Action} from '@ngrx/store';
import {User} from "../model/user.model";

export enum AuthActionTypes {
  LoginAction = '[AuthActionsTypes] Action',
  LogoutAction = '[Logout] Action',
}

export class AuthActions implements Action {
  constructor(public  payload: { user: User }) {
  }

  readonly type: string = AuthActionTypes.LoginAction.toString();
}

export type AuthActionsTypes = AuthActions;
