import { Component, OnInit } from '@angular/core';
import { Ratings } from '../../Interfaces/RatingGet';
import { PostRating } from '../../Interfaces/RatingPost';
import { RatingService } from '../rating.service';
import { MockService } from '../mock.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  RatingGet: Array<Ratings> = [];
  RatingPost: Ratings = {
    date: new Date(),
    rating: null,
    mood: '',
    comment: ''
  };
  mockData: Ratings;

  constructor(public rate: RatingService, public mock: MockService) { }

  ngOnInit(): void {


    this.mock.getRatings().subscribe( data => {
      this.RatingGet = data;
    });
  }
  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }



  generateRatings() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
    const moods = ['Angry', 'Anxious', 'Hyper', 'Calm', 'Sad', 'Motivated', 'Happy', 'Tired', 'Stressed', 'Neutral'];
    for (let i = 0; i <= 50 - 1; i++) {
      this.mockData = {
        date: this.randomDate(new Date(2020, 0, 1), new Date()),
        rating: Math.floor(Math.random() * 10),
        mood: moods[Math.floor(Math.random() * moods.length)],
        comment: this.makeRandom(50, possible)
      };
      this.RatingGet.push(this.mockData);
    }
    console.log(this.RatingGet);
    return this.RatingGet;
  }

  getMockRating(): void {

  }

  GetRating(): void {
    this.rate.getRatings().subscribe(
      data => {
        this.RatingGet = data,
          // tslint:disable-next-line: only-arrow-functions
          console.log(this.RatingGet);
        this.RatingGet.map(function (RatingGet) {
          RatingGet.date = new Date(RatingGet.date);
        });
      }
    );
  }
}
