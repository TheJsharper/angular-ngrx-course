import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AppState} from "./reducers/index";
import {LogoutAction} from "./auth/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {


  }

  logout(): void {
      this.store.dispatch(new LogoutAction())
  }


}
