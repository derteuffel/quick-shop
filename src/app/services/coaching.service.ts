import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import {API} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CoachingService {
  private coachingUrl = 'http://localhost:8181/api/coachings';

  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;


  constructor(private http: HttpClient, private authService:AuthService) {
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

  getAllCoaching(): Observable<any> {
    return this.http.get(API.COACHINGS+'/all');
  }

  getAllCoachingSearch(form): Observable<any> {
    return this.http.post(API.COACHINGS+'/all/search', form);
  }

  getAllCoachingByUser(): Observable<any> {
    return this.http.get(API.COACHINGS+'/admin', {headers: this.headers});
  }

  getCoachingById(id): Observable<any> {
    return this.http.get(API.COACHINGS+'/details/'+id);
  }

  getCoachingByRegion(region): Observable<any> {
    return this.http.get(API.COACHINGS+'/region/'+region, {headers: this.headers});
  }

  findAllQuantityOfCoahingAvailable(form): Observable<any> {
    return this.http.get(API.COACHINGS+'/admin/quantity/dispo/'+form.title+'/'+form.region, {headers: this.headers});
  }

  saveCoaching(form): Observable<any> {
    return this.http.post(`${API.COACHINGS}/admin`, form, {headers: this.formHeaders});
  }

  updateCoaching(form): Observable<any> {
    return this.http.put(`${API.COACHINGS}/admin/update`, form, { headers: this.headers});
  }

  deleteCoaching(id): Observable<any> {
    return this.http.delete(`${API.COACHINGS}/admin/${id}`, {headers: this.headers});
  }

}
