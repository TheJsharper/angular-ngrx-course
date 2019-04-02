import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {AppState} from "../reducers/index";
import {select, Store} from "@ngrx/store";
import {isLoggedInSelector} from "./auth.selectors";
import {tap} from "rxjs/internal/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const status: Observable<boolean> = this.store.pipe(
      select(<any>isLoggedInSelector),
      tap(async (loggedIn: boolean) => {
          if (!loggedIn)
            await this.router.navigateByUrl('/login')
        }
      )
      )
    ;
    return status;
  }

}
