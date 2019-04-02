import {Action} from '@ngrx/store';
import {User} from "../model/user.model";

export enum AuthActionTypes {
  LoginAction = '[Login] Action',
  LogoutAction = '[Logout] Action',
}

export class Login implements Action {
  constructor(public  payload: { user: User }) {
  }

  readonly type: string = AuthActionTypes.LoginAction.toString();
}

export type AuthActions = Login;
