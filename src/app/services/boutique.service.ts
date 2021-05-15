import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {

  private boutiqueUrl = 'http://localhost:8181/api/boutiques';
  constructor(private http: HttpClient) { }


  // recupère toute les boutiques

  getAllBoutiques(): Observable<any> {
    return this.http.get(this.boutiqueUrl, {observe: "response"});
  }

  // recupère toute les boutiques d'un user

  getAllBoutiquesByUser(): Observable<any> {
    return this.http.get(this.boutiqueUrl + '/users', {observe: "response"});
  }

  // enregister une boutique
  saveBoutique(form): Observable<any> {
    return this.http.post(this.boutiqueUrl, form, {observe: "response"});
  }

  // mettre à jour une boutique
  updateBoutique(form, id): Observable<any> {
    return this.http.put(this.boutiqueUrl + '/' + id, form, {observe: "response"});
  }

  // recupère une boutique par son id

  getBoutique(id): Observable<any> {
    return this.http.get(this.boutiqueUrl + '/' + id, {observe: "response"});
  }

  // supprime une boutique
  deleteBoutique(id): Observable<any> {
    return this.http.delete(this.boutiqueUrl + '/' + id, {observe: "response"});
  }

  // activation du code boutique
  activateBoutique(id, code): Observable<any> {
    console.log(code);
    return this.http.get(this.boutiqueUrl + '/activation/'+id+'/'+code, {observe: "response"});
  }
// envoi du code
  sendCode(id): Observable<any>{
    return this.http.get(this.boutiqueUrl+ '/send/code/'+id, {observe: "response"});
  }

  // activation boutique par l'ADMIN

  activationAdmin(id): Observable<any> {
    return this.http.get(this.boutiqueUrl+ '/admin/activation'+id, {observe: "response"});
  }

  // desactivation de la boutique
  desactivation(id): Observable<any> {
    return this.http.get(this.boutiqueUrl+ '/desactivation'+id , {observe: "response"});
  }
}
