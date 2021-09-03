import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";
import {API} from "../../environments/environment";
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;

  //private accountUrl = 'http://localhost:8181/api/account';

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


  getAllAccount(): Observable<any> {
    return this.http.get(`${API.ACCOUNT}`,{headers: this.headers})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  updateRole(id:number, role): Observable<any> {
    return this.http.get(API.ACCOUNT+'/updateRole'+'?userId='+id+'&role='+role,{headers: this.headers})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  public updateAccount(form): Observable<any>{
    console.log(form);
    return this.http.put( `${API.ACCOUNT}/admin/update`, form,{headers: this.headers})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  public updateMyAccount(form): Observable<any>{
    console.log(form);
    return this.http.put( `${API.ACCOUNT_SIMPLE}/admin/update`, form,{headers: this.headers})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  public deleteAccount(id): Observable<any> {
    return this.http.delete(`${API.ACCOUNT}/${id}`,{headers: this.headers})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  public findAllAccountByLocationAndName(location, name): Observable<any> {
    return this.http.get(`${API.ACCOUNT}/bylocationandname/${location}/${name}`,{headers: this.headers})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  public findAllAccountByRole(role): Observable<any> {
    return this.http.get(`${API.ACCOUNT}/role/${role}`,{headers: this.headers})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  public findAccountByLocation(location): Observable<any> {
    return this.http.get(`${API.ACCOUNT}/bylocation/${location}`,{headers: this.headers})
    .pipe(
      catchError(this.errorHandler)
    );
  }


  public findFullNameWithId(id): Observable<any> {
    return this.http.get(`${API.ACCOUNT}/byfullname/${id}`,{headers: this.headers})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  public countProduitByLocation(mindate,maxdate): Observable<any> {
    return this.http.get(`${API.ACCOUNT}/quantity/byuser?mindate=${mindate}&maxdate=${maxdate}`,{headers: this.headers})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  public deactivateAccount(id): Observable<any>{
     return this.http.get(`${API.ACCOUNT}/deactivation/${id}`, {headers: this.headers})
     .pipe(
      catchError(this.errorHandler)
    );
  }

  public activateAccount(id): Observable<any>{
    return this.http.get(`${API.ACCOUNT}/activation/${id}`,{headers: this.headers})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  public getConnected(): Observable<any>{
    return this.http.get(`${API.ACCOUNT_SIMPLE}/admin/view`,{headers: this.headers})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getOne(id): Observable<any>{
    return this.http.get(`${API.ACCOUNT_SIMPLE}/admin/view/${id}`,{headers: this.headers})
    .pipe(
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
