import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {User} from "../models/user";
import {API} from "../../environments/environment";

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
    return this.http.get(API.SESSIONS);
  }

  getSessionCoachingById(id): Observable<any> {
    return this.http.get(API.SESSIONS + '/' +id);
  }

  getSessionCoaching(id): Observable<any> {
    return this.http.get(`${API.SESSIONS}/coaching/${id}` );
  }

  saveSessionCoaching(form): Observable<any> {
    return this.http.post(`${API.SESSIONS}`, form);
  }

  updateSessionCoaching(form): Observable<any> {
    return this.http.put(`${API.SESSIONS}`, form);
  }

  deleteSessionCoaching(id): Observable<any> {
    return this.http.delete(`${API.SESSIONS}/${id}`);
  }

  /**
   * @author django
   *
   * */

  createSession(form, id): Observable<any> {
    return this.http.post(`${API.SESSIONS}/session/${id}`, form, {headers: this.formHeaders});
  }

}
