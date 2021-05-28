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
    return this.http.get(this.sessionCoachingUrl);
  }

  getSessionCoachingById(id): Observable<any> {
    return this.http.get(this.sessionCoachingUrl + '/' +id);
  }

  getSessionCoaching(id): Observable<any> {
    return this.http.get(this.sessionCoachingUrl + '/coaching/' +id);
  }

  saveSessionCoaching(form): Observable<any> {
    return this.http.post(this.sessionCoachingUrl, form);
  }

  updateSessionCoaching(form): Observable<any> {
    return this.http.put(this.sessionCoachingUrl, form);
  }

  deleteSessionCoaching(id): Observable<any> {
    return this.http.delete(this.sessionCoachingUrl + '/' +id);
  }

  /**
   * @author django
   *
   * */

  createSession(form, id): Observable<any> {
    return this.http.post(this.sessionCoachingUrl + '/session/' +id, form, {headers: this.formHeaders});
  }

}
