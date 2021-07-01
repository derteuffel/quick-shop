import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {API, environment} from '../../environments/environment';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;

  private accountUrl = environment.baseURL + '/api/account';

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
    return this.http.get(this.accountUrl, {observe: "response"});
  }

  public updateAccount(form): Observable<any>{
    console.log(form);
    return this.http.put( `${API.ACCOUNT}/update`, form,{headers: this.headers});
  }

  public deleteAccount(id): Observable<any> {
    return this.http.delete(`${API.ACCOUNT}/${id}`,{headers: this.headers});
  }

  public findAllAccountByLocationAndName(location, name): Observable<any> {
    return this.http.get(`${API.ACCOUNT}/bylocationandname/${location}/${name}`,{headers: this.headers});
  }

  public findAllAccountByRole(role): Observable<any> {
    return this.http.get(`${API.ACCOUNT}/role/${role}`,{headers: this.headers});
  }

  public findAccountByLocation(location): Observable<any> {
    return this.http.get(`${API.ACCOUNT}/bylocation/${location}`,{headers: this.headers});
  }


  public findFullNameWithId(id): Observable<any> {
    return this.http.get(`${API.ACCOUNT}/byfullname/${id}`,{headers: this.headers});
  }

  public countProduitByLocation(mindate,maxdate): Observable<any> {
    return this.http.get(`${API.ACCOUNT}/quantity/byuser?mindate=${mindate}&maxdate=${maxdate}`,{headers: this.headers});
  }

  public deactivateAccount(id): Observable<any>{
    return this.http.get(`${API.ACCOUNT}/deactivation/${id}`, {headers: this.headers})
  }

  public activateAccount(id): Observable<any>{
    return this.http.get(`${API.ACCOUNT}/activation/${id}`,{headers: this.headers})
  }

  getOne(id): Observable<any>{
    return this.http.get(`${API.ACCOUNT}/view/${id}`,{headers: this.headers})
  }

  public update(form): Observable<any>{
    return this.http.put( `${API.ACCOUNT}/admin/update`, form,{headers: this.headers});
  }
}
