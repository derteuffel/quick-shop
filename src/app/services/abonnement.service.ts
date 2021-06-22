import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API} from "../../environments/environment";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {

  constructor(private http: HttpClient) { }

  // recupere toute les abonnements
  getAll(): Observable<any> {
    return this.http.get(API.ABONNEMENT);
  }

  // enregistrer un abonnement

  saveAbon(form): Observable<any> {
    return this.http.post(`${API.ABONNEMENT}`, form);
  }

  // mettre à jour  un abonnement

  updateAbon(form): Observable<any> {
    return this.http.put(`${API.ABONNEMENT}`, form);
  }

  // recupérer un abonnement
   getOne(id): Observable<any>{
    return this.http.get(`${API.ABONNEMENT}/${id}`);
   }

   // supprimer un abonnement

  deleteOne(id): Observable<any>{
    return this.http.delete(`${API.ABONNEMENT}/${id}`);
  }
}
