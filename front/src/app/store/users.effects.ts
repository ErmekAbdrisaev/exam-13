import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import {
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutUser,
  logoutUserRequest,
  registerUserRequest,
  registerUserSuccess
} from './users.actions';
import { mergeMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from './types';
import { Store } from '@ngrx/store';
import { HelpersService } from '../services/helpers.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersEffects {
  constructor(
    private actions: Actions,
    private usersService: UsersService,
    private router: Router,
    private helpers: HelpersService,
    private store: Store<AppState>,
    private http: HttpClient,
  ) {
  }

  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUserRequest),
    mergeMap(({userData}) => this.usersService.registerUser(userData).pipe(
      map(user => registerUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackBar('Register successful', 'Got it!');
        void this.router.navigate(['/']);
      }),
    ))
  ));

  loginUser = createEffect(() => this.actions.pipe(
    ofType(loginUserRequest),
    mergeMap(({userData}) => this.usersService.login(userData).pipe(
      map(user => loginUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackBar('Login successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginUserFailure)
    ))
  ));

  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutUserRequest),
    mergeMap(() => {
      return this.usersService.logout().pipe(
        map(() => logoutUser()),
        tap(async () => {
          await this.router.navigate(['/']);
          this.helpers.openSnackBar('Logout successful');
        })
      );
    }))
  );
}
