import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Ratings } from '../Interfaces/Ratings'
import { PostRating } from '../Interfaces/Ratings'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(private http: HttpClient) { }

  getRatings(): Observable<Ratings[]> {
    return this.http.get<Ratings[]>('ratings')
  }

  postRatings(Rating: PostRating): Observable<PostRating> {
    return this.http.post<PostRating>('rate', Rating)
  }
}

const httpOptions = {
  headers: new HttpHeaders({

  })
}


