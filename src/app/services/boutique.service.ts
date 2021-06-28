import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import {API} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {

  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;

  private boutiqueUrl = environment.baseURL + '/api/boutiques';
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


  // recupère toute les boutiques

  getAllBoutiques(): Observable<any> {
    return this.http.get(API.BOUTIQUES, {headers: this.headers});
  }

  // recupère toute les boutiques d'un user

  getAllBoutiquesByUser(): Observable<any> {
    return this.http.get(`${API.BOUTIQUES}/users`,  {headers: this.headers});
  }

  // enregister une boutique
  saveBoutique(form): Observable<any> {
    return this.http.post(`${API.BOUTIQUES}`, form, {headers: this.formHeaders});
  }

  // mettre à jour une boutique
  updateBoutique(form, id): Observable<any> {
    return this.http.put(`${API.BOUTIQUES}/${id}`, form, {headers: this.formHeaders});
  }

  // recupère une boutique par son id

  getBoutique(id): Observable<any> {
    return this.http.get(`${API.BOUTIQUES}/${id}`, {headers: this.headers});
  }

  // supprime une boutique
  deleteBoutique(id): Observable<any> {
    return this.http.delete(`${API.BOUTIQUES}/${id}`,  {headers: this.headers});
  }

  // activation du code boutique
  activateBoutique(id, code): Observable<any> {
    console.log(code);
    return this.http.get(`${API.BOUTIQUES}/activation/${id}/${code}`);
  }
// envoi du code
  sendCode(id): Observable<any>{
    return this.http.get(`${API.BOUTIQUES}/send/code/${id}`,  {headers: this.headers});
  }

  // activation boutique par l'ADMIN

  activationAdmin(id): Observable<any> {
    return this.http.get(`${API.BOUTIQUES}/admin/activation/${id}`,  {headers: this.headers});
  }

  // desactivation de la boutique
  desactivation(id): Observable<any> {
    return this.http.get(`${API.BOUTIQUES}/desactivation/${id}`,  {headers: this.headers});
  }
}
