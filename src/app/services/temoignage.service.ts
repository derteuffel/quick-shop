import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs/index";
import {API} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TemoignageService {
  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;
  private temoignageUrl = 'http://localhost:8181/api/temoignages';

  constructor(private http: HttpClient) { }


  createTemoignage(form): Observable<any>{
    return this.http.post(`${API.TEMOIGNAGE}`, form);
  }
}
