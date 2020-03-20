import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Ratings } from '../Interfaces/Ratings'
import { PostRating } from '../Interfaces/RatingPost'
import { map } from 'rxjs/operators'
import { RatingUpdate } from '../Interfaces/RatingUpdate';

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

  getDetailRating(date: string): Observable<Ratings> {
    return this.http.get<Ratings>(`rating/${date}`)
  }

  deleteRating(date: string) {
    return this.http.delete(`delete/${date}`);
  }

  updateRating(date: string, Rating: RatingUpdate): Observable<RatingUpdate> {
    return this.http.put<RatingUpdate>(`update/${date}`, Rating)
  }
}

