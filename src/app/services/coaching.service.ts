import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import {API} from "../../environments/environment";
import { catchError } from 'rxjs/operators';

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
      authorization: 'Bearer ' + this.currentUser.token,
      
    });

  }

  getAllCoaching(): Observable<any> {
    return this.http.get(API.COACHINGS+'/all').pipe(
      catchError(this.errorHandler)
    );
  }

  getAllCoachingSearch(form): Observable<any> {
    return this.http.post(API.COACHINGS+'/all/search', form).pipe(
      catchError(this.errorHandler)
    );
  }
  getAllCoachingSearchLike(form): Observable<any> {
    console.log(form);
    return this.http.post(API.COACHINGS+'/all/search/like', form).pipe(
      catchError(this.errorHandler)
    );
  }

  getAllCoachingSearchByProvince(province,form): Observable<any>  {
    console.log(form);
    console.log(province);
    
    return this.http.post(`${API.COACHINGS}/all/province/${province}`, form).pipe(
      catchError(this.errorHandler)
    );
  }

  getAllCoachingSearchBylocation(province,form): Observable<any>  {
    console.log(form);
    console.log(province);
    
    return this.http.post(`${API.COACHINGS}/all/search/${province}`, form).pipe(
      catchError(this.errorHandler)
    );
  }

  getAllCoachingByUser(): Observable<any> {
    return this.http.get(API.COACHINGS+'/admin', {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  getAllCoachingByUserUnique(id): Observable<any> {
    return this.http.get(API.COACHINGS+'/admin/user/'+id, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  getCoachingById(id): Observable<any> {
    return this.http.get(API.COACHINGS+'/details/'+id).pipe(
      catchError(this.errorHandler)
    );
  }

  getCoachingByRegion(region): Observable<any> {
    return this.http.get(API.COACHINGS+'/region/'+region, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  findAllQuantityOfCoahingAvailable(form): Observable<any> {
    return this.http.get(API.COACHINGS+'/admin/quantity/dispo/'+form.title+'/'+form.region, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  saveCoaching(form): Observable<any> {
    return this.http.post(`${API.COACHINGS}/admin/save`, form, {headers: this.formHeaders}).pipe(
      catchError(this.errorHandler)
    );
  }

  updateCoaching(form, id): Observable<any> {
    console.log(form);
    return this.http.put(`${API.COACHINGS}/admin/update/${id}`, form, { headers: this.formHeaders}).pipe(
      catchError(this.errorHandler)
    );
  }

  deleteCoaching(id): Observable<any> {
    return this.http.delete(`${API.COACHINGS}/admin/${id}`, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
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

}
