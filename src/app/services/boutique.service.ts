import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {

  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;

  private boutiqueUrl = 'http://localhost:8181/api/boutiques';
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


  // recupère toute les boutiques

  getAllBoutiques(): Observable<any> {
    return this.http.get(this.boutiqueUrl, {headers: this.headers});
  }

  // recupère toute les boutiques d'un user

  getAllBoutiquesByUser(): Observable<any> {
    return this.http.get(this.boutiqueUrl + '/users',  {headers: this.headers});
  }

  // enregister une boutique
  saveBoutique(form): Observable<any> {
    return this.http.post(this.boutiqueUrl, form, {headers: this.formHeaders});
  }

  // mettre à jour une boutique
  updateBoutique(form, id): Observable<any> {
    return this.http.put(this.boutiqueUrl + '/' + id, form, {headers: this.formHeaders});
  }

  // recupère une boutique par son id

  getBoutique(id): Observable<any> {
    return this.http.get(this.boutiqueUrl + '/' + id, {headers: this.headers});
  }

  // supprime une boutique
  deleteBoutique(id): Observable<any> {
    return this.http.delete(this.boutiqueUrl + '/' + id,  {headers: this.headers});
  }

  // activation du code boutique
  activateBoutique(id, code): Observable<any> {
    console.log(code);
    return this.http.get(this.boutiqueUrl + '/activation/' + id + '/' + code, {observe: 'response'});
  }
// envoi du code
  sendCode(id): Observable<any>{
    return this.http.get(this.boutiqueUrl + '/send/code/' + id,  {headers: this.headers});
  }

  // activation boutique par l'ADMIN

  activationAdmin(id): Observable<any> {
    return this.http.get(this.boutiqueUrl + '/admin/activation/' + id,  {headers: this.headers});
  }

  // desactivation de la boutique
  desactivation(id): Observable<any> {
    return this.http.get(this.boutiqueUrl + '/desactivation' + id ,  {headers: this.headers});
  }
}
