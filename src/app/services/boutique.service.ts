import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {

  private boutiqueUrl = 'http://localhost:8080/api/boutiques';
  constructor(private http: HttpClient) { }


  getAllBoutiques(): Observable<any> {
    return this.http.get(this.boutiqueUrl);
  }

  getAllBoutiquesByUser(): Observable<any> {
    return this.http.get(this.boutiqueUrl + '/users');
  }

  saveBoutique(form): Observable<any> {
    return this.http.post(this.boutiqueUrl, form);
  }

  updateBoutique(form, id): Observable<any> {
    return this.http.put(this.boutiqueUrl + '/' + id, form);
  }

  getBoutique(id): Observable<any> {
    return this.http.get(this.boutiqueUrl + '/' + id);
  }

  deleteBoutique(id): Observable<any> {
    return this.http.delete(this.boutiqueUrl + '/' + id);
  }

  activateBoutique(id, code): Observable<any> {
    console.log(code);
    return this.http.get(this.boutiqueUrl + '/activation/'+id+'/'+code);
  }

  sendCode(id): Observable<any>{
    return this.http.get(this.boutiqueUrl+ '/send/code/'+id);
  }
}
