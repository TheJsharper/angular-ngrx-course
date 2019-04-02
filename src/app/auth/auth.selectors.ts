
import {createSelector, MemoizedSelector} from "@ngrx/store";

export const  selectAuthState = state => state.auth;
export const isLoggedInSelector = createSelector(
  selectAuthState,
  auth =>  auth.loggedIn
);
export const isLoggedOutSelector = createSelector(
  <any>isLoggedInSelector,
  isLoggedInParameter =>  !isLoggedInParameter
);
