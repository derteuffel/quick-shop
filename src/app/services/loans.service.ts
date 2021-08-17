import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoansService {

  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;


  //private loansUrl = 'http://204.93.157.42:8181/api/loans';
  private loansUrl = 'http://localhost:8181/api/loans';

  constructor(private http: HttpClient,
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


    getAllLoans(): Observable<any>{
      return this.http.get(`${API.LOANS}/admin`, {headers: this.headers})
    }

    getAllbyUser(): Observable<any>{
      return this.http.get(`${API.LOANS}/admin/users`, {headers: this.headers})
    }

    getAllbyRegion(form): Observable<any>{
      return this.http.post(`${API.LOANS}/admin/region`,form, {headers: this.headers})
    }

    getAllbyVisitor(): Observable<any>{
      return this.http.get(`${API.LOANS}/all`)
    }

    getAllbyStatus(value): Observable<any>{
      return this.http.get(`${API.LOANS}/admin/status/${value}`, {headers: this.headers})
    }

    getAllSearch(form): Observable<any>{
      return this.http.post(`${API.LOANS}/all/search`,form)
    }

    getAllbySector(form): Observable<any>{
      return this.http.post(`${API.LOANS}/admin/sector`,form, {headers: this.headers})
    }

    getOne(id): Observable<any>{
      return this.http.get(`${API.LOANS}/all/${id}`);
    }

    active(id): Observable<any>{
      return this.http.get(`${API.LOANS}/admin/active/${id}`,{headers:this.headers});
    }

    delete(id): Observable<any>{
      return this.http.delete(`${API.LOANS}/admin/${id}`, {headers: this.headers});
    }

    update(form, id): Observable<any>{
      console.log(form);
      return this.http.put(`${API.LOANS}/admin/${id}`,form, {headers: this.headers});
    }

    save(form): Observable<any>{
      return this.http.post(`${API.LOANS}/admin`,form, {headers: this.formHeaders});
    }


}
