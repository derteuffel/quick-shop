import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API} from "../../environments/environment";
import {Observable} from "rxjs/index";
import {AuthService} from "../auth/auth.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {

  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;

  constructor(private http: HttpClient, private authService:AuthService) {
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

  // recupere toute les abonnements
  getAll(): Observable<any> {
    return this.http.get(API.ABONNEMENT,  {headers: this.headers});
  }

  getByUser(id){
    return this.http.get(API.ABONNEMENT+'/user/'+id, {headers: this.headers});
  }

  // enregistrer un abonnement

  saveAbon(form): Observable<any> {
    console.log(form);
    return this.http.post(`${API.ABONNEMENT}/create`, form, {headers: this.formHeaders});
  }

  saveAbonnementUser(form, id){
    return this.http.post(API.ABONNEMENT+'/create/user/'+id, form, {headers: this.formHeaders});
  }

  // mettre à jour  un abonnement

  updateAbon(form): Observable<any> {
    return this.http.put(`${API.ABONNEMENT}`, form, {headers: this.formHeaders});
  }

  // recupérer un abonnement
   getOne(id): Observable<any>{
    return this.http.get(`${API.ABONNEMENT}/${id}`, {headers: this.headers});
   }

   // supprimer un abonnement

  deleteOne(id): Observable<any>{
    return this.http.delete(`${API.ABONNEMENT}/${id}`, {headers: this.headers});
  }
}
