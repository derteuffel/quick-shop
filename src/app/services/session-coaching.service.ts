import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class SessionCoachingService {
  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;

  private sessionCoachingUrl = 'http://localhost:8181/api/sessioncoachings';
  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
      'Content-Type': 'application/json; charset=UTF-8'
    });

    this.formHeaders = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token
    });
  }

  getAllSessionCoaching(): Observable<any> {
    return this.http.get(this.sessionCoachingUrl, {headers: this.headers});
  }

  getSessionCoachingById(id): Observable<any> {
    return this.http.get(this.sessionCoachingUrl + '/' +id, {headers: this.headers});
  }

  getSessionCoaching(id): Observable<any> {
    return this.http.get(this.sessionCoachingUrl + '/coaching/' +id, {headers: this.headers});
  }

  actionSession(id): Observable<any>{
    return this.http.get(this.sessionCoachingUrl+'/action/'+id, {headers: this.headers});
  }

  saveSessionCoaching(form): Observable<any> {
    return this.http.post(this.sessionCoachingUrl, form, {headers: this.headers});
  }

  updateSessionCoaching(form): Observable<any> {
    return this.http.put(this.sessionCoachingUrl, form, {headers: this.headers});
  }

  deleteSessionCoaching(id): Observable<any> {
    return this.http.delete(this.sessionCoachingUrl + '/' +id, {headers: this.headers});
  }

  /**
   * @author django
   *
   * */

  createSession(form, id): Observable<any> {
    return this.http.post(this.sessionCoachingUrl + '/session/' +id, form, {headers: this.formHeaders});
  }

}
