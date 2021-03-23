import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Parametre } from '../models/parametre';
import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './requests/login-info';
import { SignUpInfo } from './requests/signup-info';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private loginUrl = 'http://localhost:8080/api/auth/login';
  private signupUrl = 'http://localhost:8080/api/auth/signup';

  username: string;

  constructor(private http: HttpClient,
    private tokenService: TokenStorageService,
              private param: Parametre,
              private router: Router,) {
  }

  logout() {
    this.username = 'undefined';
    this.param.connecte = null;
    this.param.username = null;
    this.router.navigate(['/login']);
    this.tokenService.signOut();
    this.reloadPage();
  }

  reloadPage() {
    window.location.replace('/login');
  }

  /* login(credentials): Observable<any> {
    return this.http.post(this.loginUrl, {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  } */

  login(user): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, user, httpOptions);
  }

  signUp(user): Observable<any> {
    return this.http.post(this.signupUrl, user, httpOptions);
  }
}
