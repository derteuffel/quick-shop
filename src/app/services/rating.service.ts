import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {API} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  submitUserFeedback(pid,uid,rating): Observable<any>  {

    return this.http.post(`${API.RATING}/feedback/${pid}/${uid}/${rating}`,rating);
  }
}
