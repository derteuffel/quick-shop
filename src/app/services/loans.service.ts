import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoansService {

  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;


  private loansUrl = 'http://localhost:8181/api/loans';

  constructor(private http: HttpClient,
    private authService:AuthService) { 
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
      'Content-Type': 'application/json; charset=UTF-8'
    });

    this.formHeaders = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token
    });
    }


    getAllLoans(): Observable<any>{
      return this.http.get(this.loansUrl+'/admin', {headers: this.headers})
    }

    getAllbyUser(): Observable<any>{
      return this.http.get(this.loansUrl+'/admin/users', {headers: this.headers})
    }

    getAllbyRegion(): Observable<any>{
      return this.http.get(this.loansUrl+'/admin/region', {headers: this.headers})
    }

    getAllbyVisitor(): Observable<any>{
      return this.http.get(this.loansUrl+'/all', {headers: this.headers})
    }

    getAllbySector(): Observable<any>{
      return this.http.get(this.loansUrl+'/admin/sector', {headers: this.headers})
    }

    getOne(id): Observable<any>{
      return this.http.get(this.loansUrl+'/all/'+id);
    }

    active(id): Observable<any>{
      return this.http.get(this.loansUrl+'/admin/active/'+id,{headers:this.headers});
    }

    delete(id): Observable<any>{
      return this.http.get(this.loansUrl+'/admin/delete/'+id, {headers: this.headers});
    }

    update(form): Observable<any>{
      return this.http.put(this.loansUrl,form, {headers: this.headers});
    }

    save(form): Observable<any>{
      return this.http.put(this.loansUrl,form, {headers: this.formHeaders});
    }


}
