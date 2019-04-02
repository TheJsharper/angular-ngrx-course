import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";

import {AuthService} from "../auth.service";
import {tap} from "rxjs/operators";
import {noop} from "rxjs";
import {Router} from "@angular/router";
import {AppState} from "../../reducers/index";
import {AuthActions} from "../auth.actions";
import {User} from "../../model/user.model";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private store: Store<AppState>) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {
    const email: string = this.form.get('email').value;
    const password: string = this.form.get('password').value;
    this.auth.login(email, password)
      .pipe(
        tap((user: User) => {
          this.store.dispatch(new AuthActions({user}))
          this.router.navigateByUrl('/courses').then((status) => {/**/
          })
        })
      )
      .subscribe(
        //(user:User)=>{},
        noop,
        (err: any) => {
          console.log("===> error happens");
        }
      );
  }


}
