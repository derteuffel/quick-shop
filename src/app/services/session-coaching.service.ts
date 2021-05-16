import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class SessionCoachingService {

  private sessionCoachingUrl = 'http://localhost:8181/api/sessioncoachings';
  constructor(private http: HttpClient) { }

  getAllSessionCoaching(): Observable<any> {
    return this.http.get(this.sessionCoachingUrl, {observe: 'response'});
  }

  getSessionCoachingById(id): Observable<any> {
    return this.http.get(this.sessionCoachingUrl + '/' +id, {observe: 'response'});
  }

  getSessionCoaching(id): Observable<any> {
    return this.http.get(this.sessionCoachingUrl + '/coaching/' +id, {observe: 'response'});
  }

  saveSessionCoaching(form): Observable<any> {
    return this.http.post(this.sessionCoachingUrl, form, {observe: 'response'});
  }

  updateSessionCoaching(form): Observable<any> {
    return this.http.put(this.sessionCoachingUrl, form, {observe: 'response'});
  }

  deleteSessionCoaching(id): Observable<any> {
    return this.http.delete(this.sessionCoachingUrl + '/' +id, {observe: 'response'});
  }

}
