import { Component, OnInit } from '@angular/core';
import { RateService } from './rate.service';
import { Ratings } from '../Interfaces/Ratings'
import { PostRating } from '../Interfaces/RatingPost'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  RatingGet: Array<Ratings>
  RatingPost: PostRating = {
    date: new Date(),
    rating: null,
    mood: '',
    comment: ''
  }
  test: Date;
  constructor(public rate: RateService) { }

  ngOnInit(): void {
    this.GetRating();
  }



  GetDate(): void {
    this.rate.getRatings().subscribe
  }

  GetRating(): void {
    this.rate.getRatings().subscribe(
      data => {
        this.RatingGet = data, console.log(data), console.log(this.RatingGet.map(function (RatingGet) {
          RatingGet.date = new Date(RatingGet.date);
          console.log(RatingGet.date)
        }))
      }
    )
  }

  PostRating(): void {
    this.rate.postRatings(this.RatingPost).subscribe(
      data => { console.log(data) },
      err => { console.log(err) },
      () => { this.GetRating(); }
    )
  }
}
