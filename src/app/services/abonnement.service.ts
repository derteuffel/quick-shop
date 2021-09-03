import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API} from "../../environments/environment";
import {Observable, throwError} from "rxjs/index";
import {AuthService} from "../auth/auth.service";
import {User} from "../models/user";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {

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

  // recupere toute les abonnements
  getAll(): Observable<any> {
    return this.http.get(API.ABONNEMENT,  {headers: this.headers})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getByUser(id){
    return this.http.get(API.ABONNEMENT+'/user/'+id, {headers: this.headers})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // enregistrer un abonnement

  saveAbon(form): Observable<any> {
    console.log(form);
    return this.http.post(`${API.ABONNEMENT}/create`, form, {headers: this.formHeaders})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  saveAbonnementUser(form, id){
    return this.http.post(API.ABONNEMENT+'/create/user/'+id, form, {headers: this.formHeaders})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // mettre à jour  un abonnement

  updateAbon(form): Observable<any> {
    return this.http.put(`${API.ABONNEMENT}`, form, {headers: this.formHeaders})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // recupérer un abonnement
   getOne(id): Observable<any>{
    return this.http.get(`${API.ABONNEMENT}/${id}`, {headers: this.headers})
    .pipe(
      catchError(this.errorHandler)
    );
   }

   // supprimer un abonnement

  deleteOne(id): Observable<any>{
    return this.http.delete(`${API.ABONNEMENT}/${id}`, {headers: this.headers})
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
