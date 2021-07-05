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
    this.headers = (this.currentUser==null || this.currentUser == undefined) ? new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    }):new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
      'Content-Type': 'application/json; charset=UTF-8'
    });

    this.formHeaders = (this.currentUser==null || this.currentUser == undefined) ? new HttpHeaders({}):new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token
    });
  }

  getAllSessionCoaching(): Observable<any> {
    return this.http.get(API.SESSIONS, {headers: this.headers});
  }

  getSessionCoachingById(id): Observable<any> {
    return this.http.get(`${API.SESSIONS}/${id}`, {headers: this.headers});
  }

  getSessionCoaching(id): Observable<any> {
    return this.http.get(`${API.SESSIONS}/get/coaching/${id}`);
  }

  actionSession(id): Observable<any>{
    return this.http.get(`${API.SESSIONS}/admin/action/${id}`, {headers: this.headers});
  }

  saveSessionCoaching(form): Observable<any> {
    return this.http.post(`${API.SESSIONS}/admin`, form, {headers: this.headers});
  }

  updateSessionCoaching(form): Observable<any> {
    return this.http.put(`${API.SESSIONS}/admin`, form, {headers: this.headers});
  }

  deleteSessionCoaching(id): Observable<any> {
    return this.http.delete(`${API.SESSIONS}/admin/${id}`, {headers: this.headers});
  }

  /**
   * @author django
   *
   * */

  createSession(form, id): Observable<any> {
    return this.http.post(`${API.SESSIONS}/admin/${id}`, form, {headers: this.formHeaders});
  }

}
