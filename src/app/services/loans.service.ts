import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoansService {

  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;


  //private loansUrl = 'http://204.93.157.42:8181/api/loans';
  private loansUrl = 'http://localhost:8181/api/loans';

  constructor(private http: HttpClient,
    private authService:AuthService) { 
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

    getAllLoans(): Observable<any>{
      return this.http.get(`${API.LOANS}/admin`, {headers: this.headers}).pipe(
        catchError(this.errorHandler)
      );
    }

    getAllbyUser(): Observable<any>{
      return this.http.get(`${API.LOANS}/admin/users`, {headers: this.headers}).pipe(
        catchError(this.errorHandler)
      );
    }

    getAllbyUserId(id): Observable<any>{
      return this.http.get(`${API.LOANS}/admin/users/${id}`, {headers: this.headers}).pipe(
        catchError(this.errorHandler)
      );
    }

    getAllbyRegion(form): Observable<any>{
      return this.http.post(`${API.LOANS}/admin/region`,form, {headers: this.headers}).pipe(
        catchError(this.errorHandler)
      );
    }

    getAllbyVisitor(): Observable<any>{
      return this.http.get(`${API.LOANS}/all`).pipe(
        catchError(this.errorHandler)
      );
    }

    getAllbyStatus(value): Observable<any>{
      return this.http.get(`${API.LOANS}/admin/status/${value}`, {headers: this.headers}).pipe(
        catchError(this.errorHandler)
      );
    }

    getAllSearch(form): Observable<any>{
      return this.http.post(`${API.LOANS}/all/search`,form).pipe(
        catchError(this.errorHandler)
      );
    }

    getAllbySector(form): Observable<any>{
      return this.http.post(`${API.LOANS}/admin/sector`,form, {headers: this.headers}).pipe(
        catchError(this.errorHandler)
      );
    }

    getOne(id): Observable<any>{
      return this.http.get(`${API.LOANS}/all/${id}`).pipe(
        catchError(this.errorHandler)
      );
    }

    active(id): Observable<any>{
      return this.http.get(`${API.LOANS}/admin/active/${id}`,{headers:this.headers}).pipe(
        catchError(this.errorHandler)
      );
    }

    delete(id): Observable<any>{
      return this.http.delete(`${API.LOANS}/admin/${id}`, {headers: this.headers}).pipe(
        catchError(this.errorHandler)
      );
    }

    update(form, id): Observable<any>{
      console.log(form);
      return this.http.put(`${API.LOANS}/admin/${id}`,form, {headers: this.headers}).pipe(
        catchError(this.errorHandler)
      );
    }

    save(form): Observable<any>{
      return this.http.post(`${API.LOANS}/admin`,form, {headers: this.formHeaders}).pipe(
        catchError(this.errorHandler)
      );
    }


}
