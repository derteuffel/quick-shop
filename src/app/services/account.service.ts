import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {API} from "../../environments/environment";
import { User } from '../models/user';

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
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
      'Content-Type': 'application/json; charset=UTF-8'
    });

    this.formHeaders = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token
    });
  }


  getAllAccount(): Observable<any> {
    return this.http.get(`${API.ACCOUNT}`,{headers: this.headers});
  }

  public updateAccount(form,id): Observable<any>{
    return this.http.put( `${API.ACCOUNT}/admin/${id}`, form,{headers: this.headers});
  }

  public deleteAccount(id): Observable<any> {
    return this.http.delete(`${API.ACCOUNT}/${id}`,{headers: this.headers});
  }

  public unlockAccount(email): Observable<any> {
    return this.http.get(`${API.ACCOUNT}?email=${email}`,{headers: this.headers});
  }

  public lockAccount(email): Observable<any> {
    return this.http.get(`${API.ACCOUNT}?email=${email}`,{headers: this.headers});
  }

  public findAllAccountByLocationAndName(location, name): Observable<any> {
    return this.http.get(`${API.ACCOUNT}/bylocationandname/${location}/${name}`,{headers: this.headers});
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

  public deactivateAccount(form, id): Observable<any>{
     return this.http.post(`${API.ACCOUNT}/deactivation/${id}`, form,{headers: this.headers})
  }

  public activateAccount(form, id): Observable<any>{
    return this.http.post(`${API.ACCOUNT}/activation/${id}`, form,{headers: this.headers})
  }
}
