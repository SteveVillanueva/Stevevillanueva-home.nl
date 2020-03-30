import { Component, OnInit } from '@angular/core';
import { RatingService } from '../rating.service';
import { Router } from '@angular/router';
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
  constructor(public rate: RatingService,  private route: Router) { }

  ngOnInit(): void {
  }

  PostRating(): void {
    console.log(this.RatingPost.date);
    this.rate.postRatings(this.RatingPost).subscribe(
      data => { console.log(data); },
      err => { console.log(err); },
      () => { this.route.navigateByUrl('home'); }
    );
  }

}
