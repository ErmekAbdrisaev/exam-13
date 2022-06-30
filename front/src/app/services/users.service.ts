import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginUserData, RegisterUserData, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  registerUser(registerUserData: RegisterUserData) {
    return this.http.post<User>(environment.apiUrl + '/users', registerUserData);
  }

  login(userData: LoginUserData) {
    return this.http.post<User>(environment.apiUrl + '/users/sessions', userData);
  }

  logout() {
    return this.http.delete(environment.apiUrl + '/users/sessions');
  }
}
