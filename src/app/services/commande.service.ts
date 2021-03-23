import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private productsUrl = 'http://localhost:8080/api/produits';
  private ordersUrl = 'http://localhost:8080/api/commandes';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.ordersUrl);
  }
}
