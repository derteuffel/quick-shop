import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class CoachingService {
  private coachingUrl = 'http://localhost:8181/api/coachings';
  constructor(private http: HttpClient) { }

  getAllCoaching(): Observable<any> {
    return this.http.get(this.coachingUrl, {observe: 'response'});
  }

  getCoachingById(id): Observable<any> {
    return this.http.get(this.coachingUrl + '/' +id, {observe: 'response'});
  }

  getCoachingByRegion(region): Observable<any> {
    return this.http.get(this.coachingUrl + '/' +region, {observe: 'response'});
  }

  saveCoaching(form): Observable<any> {
    return this.http.post(this.coachingUrl, form, {observe: 'response'});
  }

  updateCoaching(form): Observable<any> {
    return this.http.put(this.coachingUrl, form, {observe: 'response'});
  }

  deleteCoaching(id): Observable<any> {
    return this.http.delete(this.coachingUrl + '/' +id, {observe: 'response'});
  }

}
