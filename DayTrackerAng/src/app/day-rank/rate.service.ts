import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Ratings } from '../Interfaces/Ratings'

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(private http: HttpClient) { }

  Ratings(): Observable<Ratings> {
    return this.http.get<Ratings>('http://localhost:3000/rating')
  }
}
