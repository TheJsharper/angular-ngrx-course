import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {User} from "../model/user.model";
import {AuthActionTypes, AuthActionsTypes} from "../auth/auth.actions";


export type AuthState = {
  loggedIn: boolean;
  user: User;
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  user: undefined
}

export function authReducer(state: AuthState = initialAuthState, action: AuthActionsTypes): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      return {loggedIn: true, user: action.payload.user};
    case  AuthActionTypes.LogoutAction:
      return{loggedIn:false,  user:undefined};
    default:
      return state;
  }
}

