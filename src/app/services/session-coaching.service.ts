import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";
import {User} from "../models/user";
import {API} from "../../environments/environment";
import { catchError } from 'rxjs/operators';

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

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
  getAllSessionCoaching(): Observable<any> {
    return this.http.get(API.SESSIONS, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  getSessionCoachingById(id): Observable<any> {
    return this.http.get(`${API.SESSIONS}/${id}`, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  getSessionCoaching(id): Observable<any> {
    return this.http.get(`${API.SESSIONS}/get/coaching/${id}`).pipe(
      catchError(this.errorHandler)
    );
  }

  actionSession(id): Observable<any>{
    return this.http.get(`${API.SESSIONS}/admin/action/${id}`, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  saveSessionCoaching(form): Observable<any> {
    return this.http.post(`${API.SESSIONS}/admin`, form, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  updateSessionCoaching(form): Observable<any> {
    return this.http.put(`${API.SESSIONS}/admin`, form, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  deleteSessionCoaching(id): Observable<any> {
    return this.http.delete(`${API.SESSIONS}/admin/${id}`, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  /**
   * @author django
   *
   * */

  createSession(form, id): Observable<any> {
    return this.http.post(`${API.SESSIONS}/admin/${id}`, form, {headers: this.formHeaders}).pipe(
      catchError(this.errorHandler)
    );
  }

}
