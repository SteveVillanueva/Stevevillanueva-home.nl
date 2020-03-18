import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { DayRankRoutingModule } from './day-rank-routing.module';
import { HomeComponent } from './home/home.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    DayRankRoutingModule,
    FormsModule,
    NgZorroAntdModule
  ],
  exports: [HomeComponent]
})
export class DayRankModule { }
