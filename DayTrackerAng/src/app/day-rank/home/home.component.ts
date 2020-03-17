import { Component, OnInit } from '@angular/core';
import { RateService } from '../rate.service';
import { Ratings } from '../../Interfaces/Ratings'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  RatingGet: Ratings[]
  RatingPost: Ratings = {
    date: '',
    rating: 0,
    comment: ''
  }
  constructor(private rate: RateService) { }

  ngOnInit(): void {
  }

  GetRating(): void {
    this.rate.getRatings().subscribe(
      data => {this.RatingGet = data, console.log(data)}
    )
  }

  PostRating(): void {
    this.rate.postRatings(this.RatingPost).subscribe(
      data => {console.log(data)}
    )
  }

}
