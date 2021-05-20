import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Parametre } from '../models/parametre';
import { User } from '../models/user';
import { AuthLoginInfo } from './requests/login-info';
import { SignUpInfo } from './requests/signup-info';
import { map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  private authUrl = 'http://localhost:8181/api/auth';

  username: string;

  constructor(private http: HttpClient,
              private router: Router, ) {
                this.currentUserSubject = new BehaviorSubject<User> (JSON.parse(localStorage.getItem('currentUser')));
                this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logout(): Observable<any> {
    return this.http.post(this.authUrl + '/logout', {}).pipe(
      map(response => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      })
    );
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

  login(user): Observable<any> {
    const header = new HttpHeaders(user ? {
      authorization: 'Basic ' + btoa(user.username + ':' + user.password)
    } : {});
    return this.http.get<any>(this.authUrl + '/login', {headers: header}).pipe(
      map(response => {
        if (response){
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }

        return response;
      })
    );
  }

  signUp(user): Observable<any> {
    return this.http.post(this.authUrl + '/signup', JSON.stringify(user), {headers: {'Content-Type': 'application/json; charset= UTF-8'}});
  }
}
