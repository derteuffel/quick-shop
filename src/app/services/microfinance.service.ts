import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class MicrofinanceService {

  private microfinanceUrl = 'http://localhost:8181/api/microfinancements';
  constructor(private http: HttpClient) { }


  // recupère toute les microfinances

  getAllFinance(): Observable<any> {
    return this.http.get(this.microfinanceUrl, {observe: "response"});
  }


  //enregister une microfinances
  saveFinance(form): Observable<any> {
    return this.http.post(this.microfinanceUrl, form, {observe: "response"});
  }

  //mettre à jour une microfinances
  updateFinance(form): Observable<any> {
    return this.http.put(this.microfinanceUrl , form, {observe: "response"});
  }

  //recupère une microfinances par son id

  getFinance(id): Observable<any> {
    return this.http.get(this.microfinanceUrl + '/' + id, {observe: "response"});
  }

  //supprime une microfinances

  deleteFinance(id): Observable<any> {
    return this.http.delete(this.microfinanceUrl + '/' + id,  {observe: "response"});
  }

  //financement microfinances by secteur activite

  getFinanceBySecteurActivite(secteur): Observable<any> {
    console.log(secteur);
    return this.http.get(this.microfinanceUrl + '/bySecteurAtivite/'+secteur, {observe: "response"});
  }

  getFinanceByRegion(region): Observable<any>{
    return this.http.get(this.microfinanceUrl+ '/byRegion/'+region,  {observe: "response"});
  }

}
