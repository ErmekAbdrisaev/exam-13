import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { LoginError, LoginUserData, User } from '../../models/user.model';
import { loginUserRequest, loginUserSuccess } from '../../store/users.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit, OnDestroy{
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | LoginError>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.loading = store.select(state => state.users.loginLoading);
    this.error = store.select(state => state.users.loginError);
  }

  onSubmit() {
    const userData: LoginUserData = this.form.value;
    this.store.dispatch(loginUserRequest({userData}));
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }
}
