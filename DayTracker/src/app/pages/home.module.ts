import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { StatisticComponent } from './statistic/statistic.component';
import { RateComponent } from './rate/rate.component';
import { DetailComponent } from './home/detail/detail.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, StatisticComponent, RateComponent, DetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    HomeRoutingModule
  ],
  exports: [
    RateComponent
  ],
  providers: [
    DatePipe
  ]
})
export class HomeModule { }
