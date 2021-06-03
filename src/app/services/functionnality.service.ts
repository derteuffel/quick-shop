import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API, getUsers, USER} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FunctionnalityService {

  constructor(private http: HttpClient) { }

  public getAllFunctionalities(page: number, totalElementsPerPage: number){
    return this.http.get(`${API.FUNCTIONALITY}/allByPage?userId=${USER.id}&page=${page}&limit=${totalElementsPerPage}`);
  }

  public getAllFunctionalitiesForUser(){
    getUsers();
    return this.http.get(`${API.FUNCTIONALITY}?userId=${USER.id}`);
  }

  public getAvailableFunctionalitiesToAttributeToUser(userId){
    return this.http.get(`${API.FUNCTIONALITY}?userId=${userId}`);
  }

  public getAvailableFunctionalitiesToUnattributeToUser(userId){
    return this.http.get(`${API.FUNCTIONALITY}?userId=${userId}`);
  }




  public attributeMultipleFunctionalitiesToOneUser(codesFunc:string[], userId){
    return this.http.put(`${API.FUNCTIONALITY}?userId=${userId}`,codesFunc);
  }

  public unattributeMultipleFunctionalitiesToOneUser(codesFunc:string[], userId){
    return this.http.put(`${API.FUNCTIONALITY}/attributeMultipleToOneUser?userId=${userId}`,codesFunc);
  }





  public enableOne(codeFunc:string){
    return this.http.put(`${API.FUNCTIONALITY}/enableOne`, codeFunc);
  }

  public disableOne(codeFunc:string){
    return this.http.put(`${API.FUNCTIONALITY}/disableOne`, codeFunc);
  }

  public blockOne(codeFunc:string){
    return this.http.put(`${API.FUNCTIONALITY}/blockOne`, codeFunc);
  }

  public unblockOne(codeFunc:string){
    return this.http.put(`${API.FUNCTIONALITY}/unblockOne`, codeFunc);
  }

  public enableMultiple(codesFunc:string[]){
    return this.http.put(`${API.FUNCTIONALITY}/enableMultiple`, codesFunc);
  }

  public disableMultiple(codesFunc:string[]){
    return this.http.put(`${API.FUNCTIONALITY}/disableMultiple`, codesFunc);
  }

  public blockMultiple(codesFunc:string[]){
    return this.http.put(`${API.FUNCTIONALITY}/blockMultiple`, codesFunc);
  }

  public unblockMultiple(codesFunc:string[]){
    return this.http.put(`${API.FUNCTIONALITY}/unblockMultiple`, codesFunc);
  }

  public getAvailableFunctionalitiesToAttributeToUserByName(like:string, userId:number){
    return this.http.get(`${API.FUNCTIONALITY}?userId=${userId}&like=${like}`);
  }

  public getAvailableFunctionalitiesToUnattributeToUserByName(like:string, userId:number){
    return this.http.get(`${API.FUNCTIONALITY}?userId=${userId}&like=${like}`);
  }



}
