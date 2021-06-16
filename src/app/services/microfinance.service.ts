import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { API } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MicrofinanceService {

  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;

  //private microfinanceUrl = 'http://204.93.157.42:8181/api/microfinancements';
  private microfinanceUrl = 'http://localhost:8181/api/microfinancements';
  constructor(private http: HttpClient,
              private authService:AuthService) { 
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


  // recupère toute les microfinances

  getAllFinance(): Observable<any> {
    return this.http.get(`${API.MICROFINANCES}`,{headers: this.headers});
  }


  //enregister une microfinances
  saveFinance(form): Observable<any> {
    return this.http.post(`${API.MICROFINANCES}`, form);
  }

  //mettre à jour une microfinances
  updateFinance(form): Observable<any> {
    return this.http.put(`${API.MICROFINANCES}` , form, {headers: this.headers});
  }

  //recupère une microfinances par son id

  getFinance(id): Observable<any> {
    return this.http.get(`${API.MICROFINANCES}/${id}`);
  }

  //supprime une microfinances

  deleteFinance(id): Observable<any> {
    return this.http.delete(`${API.MICROFINANCES}/${id}`,  { headers: this.headers});
  }

  //financement microfinances by secteur activite

  getFinanceBySecteurActivite(secteur): Observable<any> {
    console.log(secteur);
    return this.http.get(`${API.MICROFINANCES}/bySecteurActivite/${secteur}`, {headers: this.headers});
  }

  getFinanceByRegion(region): Observable<any>{
    return this.http.get(`${API.MICROFINANCES}/byRegion/${region}`,  { headers: this.headers});
  }

}
