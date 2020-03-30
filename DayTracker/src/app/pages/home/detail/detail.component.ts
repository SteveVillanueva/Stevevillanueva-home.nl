import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../rating.service';
import { Router } from '@angular/router';
import { Ratings } from '../../../Interfaces/RatingGet';
import { RatingUpdate } from '../../../Interfaces/RatingUpdate';

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
  };

  RatingUpdate: RatingUpdate = {
    rating: null,
    mood: '',
    comment: ''
  };
  constructor(public rate: RatingService, private route: Router) { }

  ngOnInit(): void {
    this.GetDetailRating();
  }

  // gets data from specific date
  GetDetailRating(): void {
    const date = this.route.url.substr(this.route.url.indexOf('-') + -4);
    this.rate.getDetailRating(date).subscribe(
      data => { this.RatingGet = data, console.log(data); }
    );
  }

  // deletes a rating
  DeleteRating(): void {
    const date = this.route.url.substr(this.route.url.indexOf('-') + -4);
    this.rate.deleteRating(date).subscribe(
      data => { console.log(data); },
      err => { console.log(err); },
      () => { this.route.navigateByUrl('home'); }
    );
  }

  // updates a rating
  UpdateRating(): void {
    const date = this.route.url.substr(this.route.url.indexOf('-') + -4);
    this.rate.updateRating(date, this.RatingUpdate).subscribe(
      data => { console.log(data); },
      err => { console.log(err); },
      () => { this.route.navigateByUrl('home'); }
    );
  }

}
