import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { DayRankRoutingModule } from './day-rank-routing.module';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    DayRankRoutingModule,
    FormsModule
  ]
})
export class DayRankModule { }
