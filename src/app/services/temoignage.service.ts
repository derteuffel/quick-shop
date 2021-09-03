import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {Observable, throwError} from "rxjs/index";
import {API} from "../../environments/environment";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemoignageService {
  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;
  private temoignageUrl = 'http://localhost:8181/api/temoignages';

  constructor(private http: HttpClient) { }


  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

  createTemoignage(form): Observable<any>{
    console.log(form);
    return this.http.post(`${API.TEMOIGNAGE}/all`, form).pipe(
      catchError(this.errorHandler)
    );
  }

  getAllTestimonial(): Observable<any>{
    return this.http.get(`${API.TEMOIGNAGE}/all`).pipe(
      catchError(this.errorHandler)
    );
  }
}
