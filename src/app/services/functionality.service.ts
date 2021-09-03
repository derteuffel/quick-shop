import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";
import {API} from "../../environments/environment";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FunctionalityService {

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


  public enableOne(codeFunc:any): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/enableOne`, codeFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public disableOne(codeFunc:any): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/disableOne`, codeFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public blockOne(codeFunc:any): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/blockOne`, codeFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public unblockOne(codeFunc:any): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/unblockOne`, codeFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public enableMultiple(codesFunc:any[]): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/enableMultiple`, codesFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public disableMultiple(codesFunc:any[]): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/disableMultiple`, codesFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public blockMultiple(codesFunc:any[]){
    return this.http.put(`${API.FUNCTIONALITY}/blockMultiple`, codesFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public unblockMultiple(codesFunc:any[]): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/unblockMultiple`, codesFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public getAttributeMultipleFunctionalitiesToOneUser(codesFunc:any[], userId): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/attributeMultipleToOneUser/?userId=${userId}`,codesFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public getUnattributeMultipleFunctionalitiesToOneUser(codesFunc:any[], userId): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/unattributeMultipleToOneUser/?userId=${userId}`,codesFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public getAttributeOneFunctionalityToOneUser(codeFunc: any,userId): Observable<any> {
      return this.http.put(`${API.FUNCTIONALITY}/attributeOneToOneUser/?userId=${userId}`, codeFunc).pipe(
        catchError(this.errorHandler)
      );
  }

  public getUnattributeOneFunctionalityToOneUser(codeFunc: any,userId): Observable<any> {
    return this.http.put(`${API.FUNCTIONALITY}/unattributeOneToOneUser/?userId=${userId}`, codeFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public getAttributeOneFunctionalityToMultipleUsers(codeFunc: any,userId: any[]): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/attributeOneToMultipleUsers/?userId=${userId}`, codeFunc).pipe(
      catchError(this.errorHandler)
    );
  }


}
