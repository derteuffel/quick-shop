import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API, BASE_URL} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private productsUrl = BASE_URL + '/api/produits';
  private ordersUrl = BASE_URL + '/api/commandes';

  constructor(private http: HttpClient) { }

  // recupere toute les commandes
  getAll(): Observable<any> {
    return this.http.get(API.COMMANDES, {observe: "response"});
  }

  // enregistrer une commande

  saveCmd(form): Observable<any> {
    return this.http.post(`${API.COMMANDES}`, form, {observe: "response"});
  }
}
