import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs/index";
import {API} from "../../environments/environment";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TemoignageService {
  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;
  private temoignageUrl = 'http://localhost:8181/api/temoignages';

  constructor(
             private http: HttpClient,
             private authService:AuthService) {
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

 getAllTemoignage(): Observable<any>{
    return this.http.get(`${API.TEMOIGNAGE}/admin`,  { headers: this.headers});
 }


  createTemoignage(form): Observable<any>{
    console.log(form);
    return this.http.post(`${API.TEMOIGNAGE}`, form);
  }

  deleteTemoignage(id): Observable<any>{
    return this.http.delete(`${API.TEMOIGNAGE}/admin/${id}`,  { headers: this.headers})
  }
}
