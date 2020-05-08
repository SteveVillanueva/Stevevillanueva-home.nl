import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd';
import { NgxChartsModule, SeriesHorizontal } from '@swimlane/ngx-charts';

import { RatingService } from '../rating.service';
import { Ratings } from 'src/app/Interfaces/RatingGet';
import { RatingStatistic } from '../../Interfaces/RatingGet';
import { MockService } from '../mock.service';
import { Moods } from '../../Interfaces/Moods';
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  month: string;
  RatingGet: Array<Ratings>;
  RatingGetStat: Array<RatingStatistic>;
  graphdata;
  ratingLength: number;
  ratingTotal: number;
  percent: number;
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

  // data used in pie chart
  PieChart = [
    { name: 'Angry', value: 0 },
    { name: 'Anxious', value: 0 },
    { name: 'Hyper', value: 0 },
    { name: 'Calm', value: 0 },
    { name: 'Sad', value: 0 },
    { name: 'Motivated', value: 0 },
    { name: 'Happy', value: 0 },
    { name: 'Tired', value: 0 },
    { name: 'Stressed', value: 0 },
    { name: 'Neutral', value: 0 }
  ];

  // used to insert data into PieChart


  // data used in LineChart
  LineChart = [
    { name: 'Rating', series: [] }
  ];

  // used to insert data into LineChart
  LineChart2 = [
    { name: 'Rating', series: [] }
  ];

  view: any[] = [700, 300];

  // options line chart
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'date';
  yAxisLabel = 'rating';
  timeline = true;


  // options pie chart
  showLegend = true;
  explodeSlices = false;
  doughnut = false;

  // color scheme for line chart
  colorSchemeLine = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  // color scheme for pie chart
  colorSchemePie = {
    domain: ['#f2746c', '#f9b665', '#f9ed6f', '#7cf76a', '#63c6f4', '#9a75e8', '#ff76c7', '#CECCCD', '#6F6D6E', '#FFFF00']
  };




  constructor(private datePipe: DatePipe, public rate: RatingService, private mock: MockService) { }

  ngOnInit(): void {
    this.onChangeMonth(new Date());
  }

  onChangeMonth(result: Date): void {
    console.log(result);
    this.month = this.datePipe.transform(result, 'yyyy-MM-dd');
    if (this.month == null) {
      this.month = new Date().toString();
      this.month = this.datePipe.transform(this.month, 'yyyy-MM-dd');
    }
    this.mock.getMonth(this.month).subscribe(
      data => { this.RatingGet = data, this.ratingLength = data.length; },
      err => { },
      () => {
        this.ratingTotal = this.totalRating();
        this.moods = this.totalMoods();
        this.averageRating = this.ratingTotal / this.ratingLength;
        this.percent = Math.round(this.ratingLength / 31 * 100);
      }
    );
    this.mock.getMonthRating(this.month).subscribe(
      data => { this.RatingGetStat = data; },
      err => { },
      () => {
        this.graphdata = this.RatingGetStat.map(x => {
          return {
            name: x.date,
            value: x.rating
          };
        });
        // tslint:disable-next-line: no-unused-expression
        this.graphdata.length - 1;
        if (this.graphdata !== '' && this.graphdata !== undefined && this.graphdata != null) {
          for (let i = 0; i <= this.graphdata.length - 1; i++) {
            this.LineChart2[0].series.push(this.graphdata[i]);
          }
        }
        this.LineChart = this.LineChart2;
        this.LineChart2 = [
          {
            name: 'rating',
            series: []
          }
        ];
      }
    );
  }

  onChangeMonthRate(result: Date): void {
    this.month = this.datePipe.transform(result, 'yyyy-MM-dd');
  }

  totalRating() {
    let total = 0;
    for (const data of this.RatingGet) {
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
    for (const data of this.RatingGet) {
      switch (data.mood) {
        case 'Angry':
          this.moods.Angry++;
          break;
        case 'Anxious':
          this.moods.Anxious++;
          break;
        case 'Hyper':
          this.moods.Hyper++;
          break;
        case 'Calm':
          this.moods.Calm++;
          break;
        case 'Sad':
          this.moods.Sad++;
          break;
        case 'Motivated':
          this.moods.Motivated++;
          break;
        case 'Happy':
          this.moods.Happy++;
          break;
        case 'Tired':
          this.moods.Tired++;
          break;
        case 'Stressed':
          this.moods.Stressed++;
          break;
        case 'Neutral':
          this.moods.Neutral++;
          break;
      }
    }
    const PieChart2 = [
      { name: 'Angry', value: this.moods.Angry },
      { name: 'Anxious', value: this.moods.Anxious },
      { name: 'Hyper', value: this.moods.Hyper },
      { name: 'Calm', value: this.moods.Calm },
      { name: 'Sad', value: this.moods.Sad },
      { name: 'Motivated', value: this.moods.Motivated },
      { name: 'Happy', value: this.moods.Happy },
      { name: 'Tired', value: this.moods.Tired },
      { name: 'Stressed', value: this.moods.Stressed },
      { name: 'Neutral', value: this.moods.Neutral }
    ];
    this.PieChart = PieChart2;
    this.moods = this.moods;
    return this.moods;
  }
}

