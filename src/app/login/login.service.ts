import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginForm } from '../login/login.type';
import { APIURL } from '../base.config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(loginFrom: LoginForm) {
    return this.http.post(APIURL + 'tokens', loginFrom);
  }
}
