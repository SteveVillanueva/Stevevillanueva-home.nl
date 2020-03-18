import { Component, OnInit } from '@angular/core';
import { RateService } from '../rate.service';
import { Ratings } from '../../Interfaces/Ratings'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  RatingGet: Ratings[]
  RatingPost: Ratings = {
    date: new Date(),
    rating: 0,
    mood: '',
    comment: ''
  }
  constructor(public rate: RateService) { }

  ngOnInit(): void {
    this.GetRating();
  }

  GetRating(): void {
    this.rate.getRatings().subscribe(
      data => { this.RatingGet = data, console.log(data) }
    )
  }

  PostRating(): void {
    this.rate.postRatings(this.RatingPost).subscribe(
      data => { console.log(data) }
    )
  }
}
