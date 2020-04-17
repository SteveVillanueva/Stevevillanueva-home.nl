import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { RatingService } from '../rating.service';
import { Ratings } from 'src/app/Interfaces/RatingGet';
import { RatingStatistic } from '../../Interfaces/RatingGet';
import { Moods } from '../../Interfaces/Moods';
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  month: string;
  year: string;
  RatingGet: Array<Ratings>;
  RatingGetStat: Array<RatingStatistic>;
  graphdata: Array<any>;
  ratingLength: number;
  ratingTotal: number;
  percent: number;
  averageNeeded: number;
  averageRating: number;
  moods: Moods = {
    Angry: 0,
    Anxious: 0,
    Hyper: 0,
    Calm: 0,
    Sad: 0,
    Motivated: 0,
    Happy: 0,
    Tired: 0,
    Stressed: 0,
    Neutral: 0,
  };

  multi: any[];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'date';
  yAxisLabel: string = 'rating';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  public data = [
    {
      "name": "test",
      "series": [
        {
          "name": "2016-09-18T16:02:33.353Z",
          "value": 3515,
        },
        {
          "name": "2016-09-17T13:59:10.324Z",
          "value": 5663,

        },
        {
          "name": "2016-09-14T23:04:17.864Z",
          "value": 3867,

        },
      ]
    }
  ];
  constructor(private datePipe: DatePipe, public rate: RatingService) { }

  ngOnInit(): void {
  }
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(this.RatingGet)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  onChangeMonth(result: Date): void {
    this.month = this.datePipe.transform(result, 'yyyy-MM-dd h:mm:ss');
    this.rate.getMonth(this.month).subscribe(
      data => { this.RatingGet = data, this.ratingLength = data.length },
      err => { },
      () => {
        this.ratingTotal = this.totalRating();
        this.moods = this.totalMoods();
        this.averageRating = this.ratingTotal / this.ratingLength;
        this.percent = Math.round(this.ratingLength / 31 * 100);
        console.log(this.RatingGet);
      }
    );
    this.rate.getMonthRating(this.month).subscribe(
      data => { this.RatingGetStat = data, console.log(data) },
      err => { },
      () => {

        this.graphdata = this.RatingGetStat.map(x => {
          return {
            name: x.date,
            value: x.rating
          };
        });
        console.log(this.graphdata);
      }
    );
  }

  onChangeMonthRate(result: Date): void {
    this.month = this.datePipe.transform(result, 'yyyy-MM-dd h:mm:ss');
  }

  onChangeYear(result: Date): void {
    this.year = this.datePipe.transform(result, 'yyyy-MM-dd h:mm:ss');
    this.rate.getYear(this.year).subscribe(
      data => { this.RatingGet = data, this.ratingLength = data.length; },
      err => { },
      () => {
        this.ratingTotal = this.totalRating();
        this.moods = this.totalMoods();
        this.averageRating = this.ratingTotal / this.ratingLength;
        this.percent = Math.round(this.ratingLength / 365 * 100);
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

  calculatePercent(mood: number) {
    const moodPercent = Math.round(mood / this.ratingLength * 100);
    return moodPercent;
  }

  totalMoods() {
    this.moods = {
      Angry: 0,
      Anxious: 0,
      Hyper: 0,
      Calm: 0,
      Sad: 0,
      Motivated: 0,
      Happy: 0,
      Tired: 0,
      Stressed: 0,
      Neutral: 0,
    };
    for (let data of this.RatingGet) {
      if (data.mood === 'Angry') {
        this.moods.Angry++;
      }
      if (data.mood === 'Anxious') {
        this.moods.Anxious++;
      }
      if (data.mood === 'Hyper') {
        this.moods.Hyper += 1
      }
      if (data.mood === 'Calm') {
        this.moods.Calm++;
      }
      if (data.mood === 'Sad') {
        this.moods.Sad++;
      }
      if (data.mood === 'Motivated') {
        this.moods.Motivated++;
      }
      if (data.mood === 'Happy') {
        this.moods.Happy++;
      }
      if (data.mood === 'Tired') {
        this.moods.Tired++;
      }
      if (data.mood === 'Stressed') {
        this.moods.Stressed++;
      }
      if (data.mood === 'Neutral') {
        this.moods.Neutral++;
      }
    }

    this.moods = this.moods
    return this.moods;
  }
}



