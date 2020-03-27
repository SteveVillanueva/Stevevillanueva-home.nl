import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd';

import { RatingService } from '../rating.service';
import { Ratings } from 'src/app/Interfaces/RatingGet';
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  month: string;
  RatingGet: Array<Ratings>;
  ratingLength: number;
  ratingTotal: number;
  percent: number;
  averageNeeded: number;
  averageRating: number;
  constructor(private datePipe: DatePipe, public rate: RatingService) { }

  ngOnInit(): void {
  }

  getMonth(): void {
    console.log(Date);
  }

  onChange(result: Date): void {
    this.month = this.datePipe.transform(result, 'yyyy-MM-dd h:mm:ss');
    console.log('month is ' + this.month);
    this.rate.getMonth(this.month).subscribe(
      data => { this.RatingGet = data, this.ratingLength = data.length; },
      err => { console.log(err); },
      () => {
        this.ratingTotal = this.totalRating();
        this.averageNeeded = this.ratingLength * 5;
        console.log(this.averageNeeded);
        this.averageRating = this.ratingTotal / this.ratingLength;
        this.percent = Math.round(this.ratingLength / 31 * 100);
        console.log(this.ratingLength);
        console.log(this.averageRating);
      }
    );
  }

  totalRating() {
    let total = 0;
    for (let data of this.RatingGet) {
      total += data.rating;
    }
    return total;
  }
}
