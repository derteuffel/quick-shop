import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API} from "../../environments/environment";
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private productsUrl = 'http://localhost:8181/api/produits';
  private ordersUrl = 'http://localhost:8181/api/commandes';

  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
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

  // recupere toute les commandes
  getAll(): Observable<any> {
    return this.http.get(`${API.COMMANDES}/admin`, {headers: this.headers});
  }
  // recupere toute les commandes
  getOne(id): Observable<any> {
    return this.http.get(`${API.COMMANDES}/get/${id}`);
  }

  // recupere toute les commandes d'un produit
  getAllByProduit(id): Observable<any> {
    return this.http.get(`${API.COMMANDES}/admin/produits/${id}`, {headers: this.headers});
  }

  // recupere toute les commandes d'un client
  getAllByUserClient(): Observable<any> {
    return this.http.get(`${API.COMMANDES}/admin/users`, {headers: this.headers});
  }

  // recupere toute les commandes d'un entreprener
  getAllByUserEntreprener(): Observable<any> {
    return this.http.get(`${API.COMMANDES}/admin/users/entreprener`, {headers: this.headers});
  }

  // enregistrer une commande

  saveCmd(form,id): Observable<any> {
    return this.http.post(`${API.COMMANDES}/createOrder/${id}`, form);
  }

  checkout(method,id): Observable<any> {
    return this.http.get(`${API.COMMANDES}/checkout/${method}/${id}`);
  }

  // recherche quantité de commande de produit et coaching par region

  getQuantityCommandCoachingByRegion(region): Observable<any> {
    return this.http.get(API.COMMANDES+'/admin/quantity/region/'+region, {headers: this.headers});
  }

  getQuantityCommandProductByRegion(location): Observable<any> {
    return this.http.get(API.COMMANDES+'/admin/quantity/region/'+location, {headers: this.headers});
  }
}
