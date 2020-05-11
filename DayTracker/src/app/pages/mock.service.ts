import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Ratings } from '../Interfaces/RatingGet';
import { PostRating } from '../Interfaces/RatingPost';
import { RatingUpdate } from '../Interfaces/RatingUpdate';
import { RatingStatistic } from '../Interfaces/RatingGet';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor(private http: HttpClient) { }
  RatingGet: Array<Ratings> = [];
  mockData: Ratings;
  test;
  getRatings(): Observable<Ratings[]> {
    // return this.http.get<Ratings[]>('ratings');
    return this.test = of([
      {
        date: new Date('2020-04-26'),
        rating: 5,
        mood: 'Angry',
        comment: 'test'
      },
      {
        date: new Date('2020-04-27'),
        rating: 8,
        mood: 'Neutral',
        comment: 'text'
      }
    ]);
  }

  getMonth(Month: string): Observable<Ratings[]> {
    return this.http.get<Ratings[]>(`ratings`);
  }

  getMonthRating(Month: string): Observable<RatingStatistic[]> {
    return this.http.get<RatingStatistic[]>(`ratings`);
  }

  getDetailRating(): Observable<Ratings> {
    return this.http.get<Ratings>(`ratings`);
  }

  postRatings(Rating: PostRating): Observable<PostRating> {
    return this.http.post<PostRating>('ratingPost', Rating);
  }
}
