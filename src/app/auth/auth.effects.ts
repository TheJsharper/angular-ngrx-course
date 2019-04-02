import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthActionTypes, LoginAction, LogoutAction} from "./auth.actions";
import {tap} from "rxjs/internal/operators";
import {Router} from "@angular/router";
import {defer, of} from "rxjs/index";
import {User} from "../model/user.model";


@Injectable()
export class AuthEffects {
  @Effect({dispatch: false})
  login$ = this.actions$.pipe(
    ofType<LoginAction>(AuthActionTypes.LoginAction.toString()),
    tap((action: LoginAction) => localStorage.setItem("user", JSON.stringify(action.payload.user)))
  );

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType<LogoutAction>(AuthActionTypes.LogoutAction.toString()),
    tap(async (action: LoginAction) => {
      localStorage.removeItem("user");
      await this.router.navigateByUrl('/login');
    })
  );

  @Effect()
  init$ = defer(() => {
      const userData: string = localStorage.getItem('user');
      if (userData != undefined) {
        const payload:{user:User} = {user:<User>JSON.parse(userData)};
        return of(new LoginAction(payload));
      } else {
        return of(new LogoutAction());
      }
    }
  );

  constructor(private actions$: Actions, private  router: Router) {
  }
}
