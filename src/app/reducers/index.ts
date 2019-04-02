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
import {authReducer, AuthState} from "../auth/auth.reducer";
import {routerReducer} from "@ngrx/router-store";



export interface AppState {
  //auth?: AuthState,
}



export const reducers: ActionReducerMap<AppState> = {
 // auth: authReducer
  router: routerReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
