import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {API} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FunctionalityService {

  constructor(private http: HttpClient) { }


  public enableOne(codeFunc:any): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/enableOne`, codeFunc);
  }

  public disableOne(codeFunc:any): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/disableOne`, codeFunc);
  }

  public blockOne(codeFunc:any): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/blockOne`, codeFunc);
  }

  public unblockOne(codeFunc:any): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/unblockOne`, codeFunc);
  }

  public enableMultiple(codesFunc:any[]): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/enableMultiple`, codesFunc);
  }

  public disableMultiple(codesFunc:any[]): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/disableMultiple`, codesFunc);
  }

  public blockMultiple(codesFunc:any[]){
    return this.http.put(`${API.FUNCTIONALITY}/blockMultiple`, codesFunc);
  }

  public unblockMultiple(codesFunc:any[]): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/unblockMultiple`, codesFunc);
  }

  public getAttributeMultipleFunctionalitiesToOneUser(codesFunc:any[], userId): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/attributeMultipleToOneUser/?userId=${userId}`,codesFunc);
  }

  public getUnattributeMultipleFunctionalitiesToOneUser(codesFunc:any[], userId): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/unattributeMultipleToOneUser/?userId=${userId}`,codesFunc);
  }

  public getAttributeOneFunctionalityToOneUser(codeFunc: any,userId): Observable<any> {
      return this.http.put(`${API.FUNCTIONALITY}/attributeOneToOneUser/?userId=${userId}`, codeFunc);
  }

  public getUnattributeOneFunctionalityToOneUser(codeFunc: any,userId): Observable<any> {
    return this.http.put(`${API.FUNCTIONALITY}/unattributeOneToOneUser/?userId=${userId}`, codeFunc);
  }

  public getAttributeOneFunctionalityToMultipleUsers(codeFunc: any,userId: any[]): Observable<any>{
    return this.http.put(`${API.FUNCTIONALITY}/attributeOneToMultipleUsers/?userId=${userId}`, codeFunc);
  }


}
