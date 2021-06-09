import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {API} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountUrl = 'http://localhost:8181/api/account';

  constructor(private http: HttpClient) { }


  getAllAccount(): Observable<any> {
    return this.http.get(`${API.ACCOUNT}/all`);
  }

  public updateAccount(form,id): Observable<any>{
    return this.http.put( `${API.ACCOUNT}/${id}`, form);
  }

  public deleteAccount(id): Observable<any> {
    return this.http.delete(`${API.ACCOUNT}/${id}`);
  }

  public unlockAccount(email): Observable<any> {
    return this.http.get(`${API.ACCOUNT}?email=${email}`);
  }

  public lockAccount(email): Observable<any> {
    return this.http.get(`${API.ACCOUNT}?email=${email}`);
  }

  public findAllAccountByLocationAndName(location, name): Observable<any> {
    return this.http.get(`${API.ACCOUNT}/bylocationandname/${location}/${name}`);
  }

  public findAccountByLocation(location): Observable<any> {
    return this.http.get(`${API.ACCOUNT}/bylocation/${location}`);
  }


  public findFullNameWithId(id): Observable<any> {
    return this.http.get(`${API.ACCOUNT}/byfullname/${id}`);
  }

  public countProduitByLocation(mindate,maxdate): Observable<any> {
    return this.http.get(`${API.ACCOUNT}/quantity/byuser?mindate=${mindate}&maxdate=${maxdate}`);
  }

  public deactivateAccount(form, id): Observable<any>{
     return this.http.get(`${API.ACCOUNT}/deactivation/${id}`, form)
  }

  public activateAccount(form, id): Observable<any>{
    return this.http.get(`${API.ACCOUNT}/activation/${id}`, form)
  }
}
