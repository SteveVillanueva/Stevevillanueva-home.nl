import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Ratings } from '../Interfaces/Ratings'

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(private http: HttpClient) { }

  getRatings(): Observable<Ratings[]> {
    return this.http.get<Ratings[]>('rating')
  }

  postRatings(Rating: Ratings): Observable<Ratings> {
    return this.http.post<Ratings>('rate', Rating, )
  }
}

const httpOptions = {
  headers: new HttpHeaders({

  })
}


