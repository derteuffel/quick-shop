import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {API, BASE_URL} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountUrl =  BASE_URL + '/api/account';

  constructor(private http: HttpClient) { }


  getAllAccount(): Observable<any> {
    return this.http.get(API.ACCOUNT);
  }
}
