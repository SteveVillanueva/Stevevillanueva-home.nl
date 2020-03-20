import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { RateService } from '../rate.service';
import { Ratings } from '../../Interfaces/Ratings'
import { RatingUpdate } from '../../Interfaces/RatingUpdate'
import { PostRating } from '../../Interfaces/RatingPost'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  RatingGet: Ratings = {
    date: new Date(),
    rating: null,
    mood: '',
    comment: ''
  }

  RatingUpdate: RatingUpdate = {
    rating: null,
    mood: '',
    comment: ''
  }
  constructor(public rate: RateService, private route: Router) { }

  ngOnInit(): void {
    this.GetDetailRating();
  }

  // gets data from specific date
  GetDetailRating(): void {
    const date = this.route.url.substr(this.route.url.indexOf('-') + -4);
    this.rate.getDetailRating(date).subscribe(
      data => {this.RatingGet = data, console.log(data)}
    )
  }

  // deletes a rating
  DeleteRating(): void {
    const date = this.route.url.substr(this.route.url.indexOf('-') + -4);
    this.rate.deleteRating(date).subscribe(
      data => {console.log(data)}
    )
  }

  // updates a rating
  UpdateRating(): void {
    const date = this.route.url.substr(this.route.url.indexOf('-') + -4);
    this.rate.updateRating(date, this.RatingUpdate).subscribe(
      data => {console.log(data)}
    )
  }



}
