import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountUrl = 'http://localhost:8181/api/account';

  constructor(private http: HttpClient) { }


  getAllAccount(): Observable<any> {
    return this.http.get(this.accountUrl, {observe: "response"});
  }
}
