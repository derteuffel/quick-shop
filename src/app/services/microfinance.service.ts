import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class MicrofinanceService {

  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;

  private microfinanceUrl = 'http://localhost:8181/api/microfinancements';
  constructor(private http: HttpClient,
              private authService:AuthService) { 
                this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
      'Content-Type': 'application/json; charset=UTF-8'
    });

    this.formHeaders = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token
    });

              }


  // recupère toute les microfinances

  getAllFinance(): Observable<any> {
    return this.http.get(this.microfinanceUrl);
  }


  //enregister une microfinances
  saveFinance(form): Observable<any> {
    return this.http.post(this.microfinanceUrl, form, { headers: this.headers});
  }

  //mettre à jour une microfinances
  updateFinance(form): Observable<any> {
    return this.http.put(this.microfinanceUrl , form, {headers: this.headers});
  }

  //recupère une microfinances par son id

  getFinance(id): Observable<any> {
    return this.http.get(this.microfinanceUrl + '/' + id);
  }

  //supprime une microfinances

  deleteFinance(id): Observable<any> {
    return this.http.delete(this.microfinanceUrl + '/' + id,  { headers: this.headers});
  }

  //financement microfinances by secteur activite

  getFinanceBySecteurActivite(secteur): Observable<any> {
    console.log(secteur);
    return this.http.get(this.microfinanceUrl + '/bySecteurAtivite/'+secteur, {headers: this.headers});
  }

  getFinanceByRegion(region): Observable<any>{
    return this.http.get(this.microfinanceUrl+ '/byRegion/'+region,  { headers: this.headers});
  }

}
