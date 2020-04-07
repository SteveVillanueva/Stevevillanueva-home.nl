import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { StatisticComponent } from './statistic/statistic.component';
import { RateComponent } from './rate/rate.component';
import { DetailComponent } from './home/detail/detail.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultComponent } from './result/result.component';



@NgModule({
  declarations: [HomeComponent, StatisticComponent, RateComponent, DetailComponent, ResultComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    HomeRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    RateComponent
  ],
  providers: [
    DatePipe
  ]
})
export class HomeModule { }
