import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { BACK_BASE_URL } from '../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  private authUrl =  BACK_BASE_URL + '/api/auth';
  private testUrl = 'http://localhost:8181/api/account';

  username: string;

  constructor(private http: HttpClient,
              private router: Router, ) {
                this.currentUserSubject = new BehaviorSubject<User> (JSON.parse(localStorage.getItem('currentUser')));
                this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logOut(): Observable<any> {
    return this.http.post(this.authUrl + "/logout", {}).pipe(
      map(response => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      })
    );
  }

  activate(email): Observable<any> {
    return this.http.get(this.authUrl + "/activation/"+email).pipe(
      map(response => {
        if(response){
          this.router.navigateByUrl('connexion');
        }
        return response;
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
    const headers = new HttpHeaders(user ? {
      authorization:'Basic ' + btoa(user.username + ':' + user.password)
    }:{});

    return this.http.get<any> (this.authUrl + "/login", {headers:headers}).pipe(
      map(response => {
        if(response) {
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

  getUserToken():string{
    let userCurrent:any;
    if(localStorage.getItem('currentUser')!=null){
      userCurrent = JSON.parse(localStorage.getItem('currentUser'));
      return userCurrent.token;
    }
    return null;
  }
}
