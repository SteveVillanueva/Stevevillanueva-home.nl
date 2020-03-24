import { Component, OnInit } from '@angular/core';
import { RatingService } from '../rating.service';

import { PostRating } from '../../Interfaces/RatingPost';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  RatingPost: PostRating = {
    date: new Date(),
    rating: null,
    mood: '',
    comment: ''
  };
  constructor(public rate: RatingService) { }

  ngOnInit(): void {
  }

  PostRating(): void {
    this.rate.postRatings(this.RatingPost).subscribe(
      data => { console.log(data); },
      err => { console.log(err); },
      () => { }
    );
  }

}
