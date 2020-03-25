import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Ratings } from '../Interfaces/RatingGet';
import { PostRating } from '../Interfaces/RatingPost';
import { RatingUpdate } from '../Interfaces/RatingUpdate';
import { RatingGetMonth } from '../Interfaces/RatingGetMonth';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  getRatings(): Observable<Ratings[]> {
    return this.http.get<Ratings[]>('ratings');
  }

  postRatings(Rating: PostRating): Observable<PostRating> {
    return this.http.post<PostRating>('rate', Rating);
  }

  getDetailRating(date: string): Observable<Ratings> {
    return this.http.get<Ratings>(`rating/${date}`);
  }

  deleteRating(date: string) {
    return this.http.delete(`delete/${date}`);
  }

  updateRating(date: string, Rating: RatingUpdate): Observable<RatingUpdate> {
    return this.http.put<RatingUpdate>(`update/${date}`, Rating);
  }

  getMonth(Month: string): Observable<Ratings[]> {
    return this.http.get<Ratings[]>(`ratingMonth/${Month}`);
  }
}
