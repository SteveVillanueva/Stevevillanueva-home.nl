import { Component, OnInit } from '@angular/core';
import { Ratings } from '../../Interfaces/RatingGet';
import { PostRating } from '../../Interfaces/RatingPost';
import { RatingService } from '../rating.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  RatingGet: Array<Ratings>;
  RatingPost: PostRating = {
    date: new Date(),
    rating: null,
    mood: '',
    comment: ''
  };
  constructor(public rate: RatingService) { }

  ngOnInit(): void {
    this.GetRating();
  }
  GetRating(): void {
    this.rate.getRatings().subscribe(
      data => {
        this.RatingGet = data,
          // tslint:disable-next-line: only-arrow-functions
          this.RatingGet.map(function (RatingGet) {
            RatingGet.date = new Date(RatingGet.date);
          });
      }
    );
  }
}
