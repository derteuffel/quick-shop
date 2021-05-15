import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private productsUrl = 'http://localhost:8181/api/produits';
  private ordersUrl = 'http://localhost:8181/api/commandes';

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
