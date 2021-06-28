import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import { AuthService } from '../auth/auth.service';
import {API, environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MicrofinanceService {

  private headers:any = new HttpHeaders()
                          .set('content-type', 'application/json')
                          .set('Authorization', 'Bearer ' + this.authService.getUserToken());

  private microfinanceUrl = environment.baseURL +  '/api/microfinancements';
  constructor(private http: HttpClient,
              private authService:AuthService) { }


  // recupère toute les microfinances

  getAllFinance(): Observable<any> {
    return this.http.get(this.microfinanceUrl, {observe: 'response', headers: this.headers});
  }


  //enregister une microfinances
  saveFinance(form): Observable<any> {
    return this.http.post(this.microfinanceUrl, form, {observe: 'response', headers: this.headers});
  }

  //mettre à jour une microfinances
  updateFinance(form): Observable<any> {
    return this.http.put(this.microfinanceUrl , form, {observe: 'response', headers: this.headers});
  }

  //recupère une microfinances par son id

  getFinance(id): Observable<any> {
    return this.http.get(this.microfinanceUrl + '/' + id, {observe: 'response', headers: this.headers});
  }

  //supprime une microfinances

  deleteFinance(id): Observable<any> {
    return this.http.delete(this.microfinanceUrl + '/' + id,  {observe: 'response', headers: this.headers});
  }

  //financement microfinances by secteur activite

  getFinanceBySecteurActivite(secteur): Observable<any> {
    console.log(secteur);
    return this.http.get(this.microfinanceUrl + '/bySecteurAtivite/'+secteur, {observe: 'response', headers: this.headers});
  }

  getFinanceByRegion(region): Observable<any>{
    return this.http.get(this.microfinanceUrl+ '/byRegion/'+region,  {observe: 'response', headers: this.headers});
  }

  getActivationMicrofinacement(id): Observable<any>{
    return this.http.get(`${API.MICROFINANCES}/activer/${id}`,  { headers: this.headers});

  }

}
