import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private productsUrl = environment.baseURL  + '/api/produits';
  private ordersUrl = environment.baseURL + '/api/commandes';

  constructor(private http: HttpClient) { }

  // recupere toute les commandes
  getAll(): Observable<any> {
    return this.http.get(this.ordersUrl, {observe: "response"});
  }

  // enregistrer une commande

  saveCmd(form): Observable<any> {
    return this.http.post(this.ordersUrl, form, {observe: "response"});
  }
}
