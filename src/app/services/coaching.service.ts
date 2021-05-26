import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoachingService {
  private coachingUrl = 'http://localhost:8181/api/coachings';

  private headers:any = new HttpHeaders()
                          .set('content-type', 'application/json')
                          .set('Authorization', 'Bearer ' + this.authService.getUserToken());

  private formHeaders: any = new HttpHeaders()
                                .set('Authorization', 'Bearer '+ this.authService.getUserToken);

  constructor(private http: HttpClient, private authService:AuthService) {

  }

  getAllCoaching(): Observable<any> {
    return this.http.get(this.coachingUrl, {observe: 'response', headers: this.headers});
  }

  getCoachingById(id): Observable<any> {
    return this.http.get(this.coachingUrl + '/' +id, {observe: 'response', headers: this.headers});
  }

  getCoachingByRegion(region): Observable<any> {
    return this.http.get(this.coachingUrl + '/' +region, {observe: 'response', headers: this.headers});
  }

  saveCoaching(form): Observable<any> {
    return this.http.post(this.coachingUrl, form, {observe: 'response', headers: this.formHeaders});
  }

  updateCoaching(form): Observable<any> {
    return this.http.put(this.coachingUrl+'/', form, {observe: 'response', headers: this.headers});
  }

  deleteCoaching(id): Observable<any> {
    return this.http.delete(this.coachingUrl + '/' +id, {observe: 'response', headers: this.headers});
  }

}
