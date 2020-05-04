import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd';
import { NgxChartsModule, SeriesHorizontal } from '@swimlane/ngx-charts';

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

  PieChart = [
    {
      name: 'Angry',
      value: 0
    },
    {
      name: 'Anxious',
      value: 0
    },
    {
      name: 'Hyper',
      value: 0
    },
    {
      name: 'Calm',
      value: 0
    },
    {
      name: 'Sad',
      value: 0
    },
    {
      name: 'Motivated',
      value: 0
    },
    {
      name: 'Happy',
      value: 0
    },
    {
      name: 'Tired',
      value: 0
    },
    {
      name: 'Stressed',
      value: 0
    },
    {
      name: 'Neutral',
      value: 0
    }
  ];

  PieChart2 = [
    {
      name: 'Angry',
      value: this.moods.Angry
    },
    {
      name: 'Anxious',
      value: this.moods.Anxious
    },
    {
      name: 'Hyper',
      value: this.moods.Hyper
    },
    {
      name: 'Calm',
      value: this.moods.Calm
    },
    {
      name: 'Sad',
      value: this.moods.Sad
    },
    {
      name: 'Motivated',
      value: this.moods.Motivated
    },
    {
      name: 'Happy',
      value: this.moods.Happy
    },
    {
      name: 'Tired',
      value: this.moods.Tired
    },
    {
      name: 'Stressed',
      value: this.moods.Stressed
    },
    {
      name: 'Neutral',
      value: +this.moods.Neutral
    }
  ];

  view: any[] = [700, 300];

  // options line chart
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
    domain: ['#F8B6B2', '#FCD9AF', '#FCF6B8', '#BCFBB3', '#AAE0F9', '#CAB7F3', '#FFC2E6', '#CECCCD', '#6F6D6E', '#FFFF00']
  };

  LineChart = [
    {
      name: 'Rating',
      series: []
    }
  ];

  LineChart2 = [
    {
      name: 'Rating',
      series: []
    }
  ];


  constructor(private datePipe: DatePipe, public rate: RatingService) { }

  ngOnInit(): void {
  }

  onChangeMonth(result: Date): void {
    this.month = this.datePipe.transform(result, 'yyyy-MM-dd h:mm:ss');
    this.rate.getMonth(this.month).subscribe(
      data => { this.RatingGet = data, this.ratingLength = data.length; },
      err => { },
      () => {
        this.ratingTotal = this.totalRating();
        this.moods = this.totalMoods();
        this.averageRating = this.ratingTotal / this.ratingLength;
        this.percent = Math.round(this.ratingLength / 31 * 100);
      }
    );
    this.rate.getMonthRating(this.month).subscribe(
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
        this.moods.Hyper++;
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
    this.PieChart2 = [
      {
        name: 'Angry',
        value: this.moods.Angry
      },
      {
        name: 'Anxious',
        value: this.moods.Anxious
      },
      {
        name: 'Hyper',
        value: this.moods.Hyper
      },
      {
        name: 'Calm',
        value: this.moods.Calm
      },
      {
        name: 'Sad',
        value: this.moods.Sad
      },
      {
        name: 'Motivated',
        value: this.moods.Motivated
      },
      {
        name: 'Happy',
        value: this.moods.Happy
      },
      {
        name: 'Tired',
        value: this.moods.Tired
      },
      {
        name: 'Stressed',
        value: this.moods.Stressed
      },
      {
        name: 'Neutral',
        value: +this.moods.Neutral
      }
    ];
    this.PieChart = this.PieChart2;
    this.moods = this.moods;
    return this.moods;
  }
}



