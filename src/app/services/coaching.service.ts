import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import { AuthService } from '../auth/auth.service';
import {API, environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoachingService {
  private coachingUrl = environment.baseURL + '/api/coachings';

  private headers:any = new HttpHeaders()
                          .set('content-type', 'application/json')
                          .set('Authorization', 'Bearer ' + this.authService.getUserToken());

  private formHeaders: any = new HttpHeaders()
                                .set('Authorization', 'Bearer '+ this.authService.getUserToken);

  constructor(private http: HttpClient, private authService:AuthService) {

  }

  getAllCoaching(): Observable<any> {
    return this.http.get(API.COACHINGS);
  }

  getCoachingById(id): Observable<any> {
    return this.http.get(API.COACHINGS+ '/' +id);
  }

  getCoachingByRegion(region): Observable<any> {
    return this.http.get(API.COACHINGS + '/' +region, {headers: this.headers});
  }

  findAllQuantityOfCoahingAvailable(form): Observable<any> {
    return this.http.get(API.COACHINGS+'/admin/quantity/dispo/'+form.title+'/'+form.region, {headers: this.headers});
  }

  saveCoaching(form): Observable<any> {
    return this.http.post(`${API.COACHINGS}/admin`, form, {headers: this.formHeaders});
  }

  updateCoaching(form): Observable<any> {
    return this.http.put(`${API.COACHINGS}/admin/update`, form, { headers: this.headers});
  }

  deleteCoaching(id): Observable<any> {
    return this.http.delete(`${API.COACHINGS}/admin/${id}`, {headers: this.headers});
  }

  getAllCoachingSearch(form): Observable<any> {
    return this.http.post(API.COACHINGS+'/search', form);
  }

  getAllCoachingByUser(): Observable<any> {
    return this.http.get(API.COACHINGS+'/admin', {headers: this.headers});
  }

}
