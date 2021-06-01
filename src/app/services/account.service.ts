import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountUrl = environment.baseURL + '/api/account';

  constructor(private http: HttpClient) { }


  getAllAccount(): Observable<any> {
    return this.http.get(this.accountUrl, {observe: "response"});
  }
}
