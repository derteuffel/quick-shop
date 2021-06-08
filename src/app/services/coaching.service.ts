import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import {API, BASE_URL} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CoachingService {
  private coachingUrl = BASE_URL + '/api/coachings';

  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;


  constructor(private http: HttpClient,
    private authService:AuthService) { 
      this.currentUser = JSON.parse(''+localStorage.getItem('currentUser'));

    this.headers = (this.currentUser!=null) ? new HttpHeaders({
    authorization: 'Bearer ' + this.currentUser.token,
    'Content-Type': 'application/json; charset=UTF-8'
    }) : new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
    });

    this.formHeaders = (this.currentUser!=null) ? new HttpHeaders({authorization: 'Bearer ' + this.currentUser.token}) : new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});

    }

  getAllCoaching(): Observable<any> {
    return this.http.get(API.COACHINGS);
  }

  getAllCoachingSearch(form): Observable<any> {
    return this.http.post(this.coachingUrl+'/search', form);
  }

  getAllCoachingByUser(): Observable<any> {
    return this.http.get(this.coachingUrl+'/admin', {headers: this.headers});
  }

  getCoachingById(id): Observable<any> {
    return this.http.get(this.coachingUrl+'/details/'+id);
  }

  getCoachingByRegion(region): Observable<any> {
    return this.http.get(this.coachingUrl+'/region/'+region, {headers: this.headers});
  }

  saveCoaching(form): Observable<any> {
    return this.http.post(`${API.COACHINGS}`, form, {headers: this.formHeaders});
  }

  updateCoaching(form): Observable<any> {
    return this.http.put(`${API.COACHINGS}`, form, { headers: this.headers});
  }

  deleteCoaching(id): Observable<any> {
    return this.http.delete(`${API.COACHINGS}/${id}`, {headers: this.headers});
  }

}
