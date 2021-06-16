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
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
      'Content-Type': 'application/json; charset=UTF-8'
    });

    this.formHeaders = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token
    });
  }

  // recupere toute les commandes
  getAll(): Observable<any> {
    return this.http.get(`${API.COMMANDES}/admin`, {headers: this.headers});
  }

  // enregistrer une commande

  saveCmd(form,id): Observable<any> {
    return this.http.post(`${API.COMMANDES}/createOrder/${id}`, form);
  }
}
