import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API, getUsers, USER} from "../../environments/environment";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FunctionnalityService {

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

  public getAllFunctionalities(page: number, totalElementsPerPage: number){
    return this.http.get(`${API.FUNCTIONALITY}/allByPage?userId=${USER.id}&page=${page}&limit=${totalElementsPerPage}`).pipe(
      catchError(this.errorHandler)
    );
  }

  public getAllFunctionalitiesForUser(){
    getUsers();
    return this.http.get(`${API.FUNCTIONALITY}?userId=${USER.id}`).pipe(
      catchError(this.errorHandler)
    );
  }

  public getAvailableFunctionalitiesToAttributeToUser(userId){
    return this.http.get(`${API.FUNCTIONALITY}?userId=${userId}`).pipe(
      catchError(this.errorHandler)
    );
  }

  public getAvailableFunctionalitiesToUnattributeToUser(userId){
    return this.http.get(`${API.FUNCTIONALITY}?userId=${userId}`).pipe(
      catchError(this.errorHandler)
    );
  }




  public attributeMultipleFunctionalitiesToOneUser(codesFunc:string[], userId){
    return this.http.put(`${API.FUNCTIONALITY}?userId=${userId}`,codesFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public unattributeMultipleFunctionalitiesToOneUser(codesFunc:string[], userId){
    return this.http.put(`${API.FUNCTIONALITY}/attributeMultipleToOneUser?userId=${userId}`,codesFunc).pipe(
      catchError(this.errorHandler)
    );
  }





  public enableOne(codeFunc:string){
    return this.http.put(`${API.FUNCTIONALITY}/enableOne`, codeFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public disableOne(codeFunc:string){
    return this.http.put(`${API.FUNCTIONALITY}/disableOne`, codeFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public blockOne(codeFunc:string){
    return this.http.put(`${API.FUNCTIONALITY}/blockOne`, codeFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public unblockOne(codeFunc:string){
    return this.http.put(`${API.FUNCTIONALITY}/unblockOne`, codeFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public enableMultiple(codesFunc:string[]){
    return this.http.put(`${API.FUNCTIONALITY}/enableMultiple`, codesFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public disableMultiple(codesFunc:string[]){
    return this.http.put(`${API.FUNCTIONALITY}/disableMultiple`, codesFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public blockMultiple(codesFunc:string[]){
    return this.http.put(`${API.FUNCTIONALITY}/blockMultiple`, codesFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public unblockMultiple(codesFunc:string[]){
    return this.http.put(`${API.FUNCTIONALITY}/unblockMultiple`, codesFunc).pipe(
      catchError(this.errorHandler)
    );
  }

  public getAvailableFunctionalitiesToAttributeToUserByName(like:string, userId:number){
    return this.http.get(`${API.FUNCTIONALITY}?userId=${userId}&like=${like}`).pipe(
      catchError(this.errorHandler)
    );
  }

  public getAvailableFunctionalitiesToUnattributeToUserByName(like:string, userId:number){
    return this.http.get(`${API.FUNCTIONALITY}?userId=${userId}&like=${like}`).pipe(
      catchError(this.errorHandler)
    );
  }



}
