import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import { AuthService } from '../auth/auth.service';
import {API} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class MicrofinanceService {

  private headers:any = new HttpHeaders()
                          .set('content-type', 'application/json')
                          .set('Authorization', 'Bearer ' + this.authService.getUserToken());

  private microfinanceUrl = 'http://localhost:8181/api/microfinancements';
  constructor(private http: HttpClient,
              private authService:AuthService) { }


  // recupère toute les microfinances

  getAllFinance(): Observable<any> {
    return this.http.get(API.MICROFINANCES, { headers: this.headers});
  }


  //enregister une microfinances
  saveFinance(form): Observable<any> {
    return this.http.post(`${API.MICROFINANCES}`, form, { headers: this.headers});
  }

  //mettre à jour une microfinances
  updateFinance(form): Observable<any> {
    return this.http.put(`${API.MICROFINANCES}` , form, {headers: this.headers});
  }

  //recupère une microfinances par son id

  getFinance(id): Observable<any> {
    return this.http.get(`${API.MICROFINANCES}/${id}`, {headers: this.headers});
  }

  //supprime une microfinances

  deleteFinance(id): Observable<any> {
    return this.http.delete(`${API.MICROFINANCES}/${id}`,  { headers: this.headers});
  }

  //financement microfinances by secteur activite

  getFinanceBySecteurActivite(secteur): Observable<any> {
    console.log(secteur);
    return this.http.get(`${API.MICROFINANCES}/bySecteurAtivite/${secteur}`, {headers: this.headers});
  }

  getFinanceByRegion(region): Observable<any>{
    return this.http.get(`${API.MICROFINANCES}/byRegion/${region}`,  { headers: this.headers});
  }

}
