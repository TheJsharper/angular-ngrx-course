import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {LogoutAction} from "./auth/auth.actions";
import {map} from "rxjs/Operators";
import {isLoggedInSelector, isLoggedOutSelector} from "./auth/auth.selectors";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private store: Store<any>, private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(
      //  map(state => state.auth.loggedIn)
      select(<any>isLoggedInSelector)
    );
    this.isLoggedOut$ = this.store.pipe(
      // map(state => !state.auth.loggedIn)
      select(<any>isLoggedOutSelector)
    );


  }

  async logout(): Promise<void> {
    this.store.dispatch(new LogoutAction())
    await this.router.navigateByUrl('/login');
  }


}
