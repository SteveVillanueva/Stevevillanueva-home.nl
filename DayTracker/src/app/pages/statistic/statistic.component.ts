import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd';

import { RatingService } from '../rating.service';
import { Ratings } from 'src/app/Interfaces/RatingGet';
import { Moods } from '../../Interfaces/Moods';
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
        this.moods = this.totalMoods();
        this.averageRating = this.ratingTotal / this.ratingLength;
        this.percent = Math.round(this.ratingLength / 31 * 100);
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
    console.log(this.moods);
    this.moods = this.moods
    return this.moods;
  }
}



