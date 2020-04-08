import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from './statistic.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';



@NgModule({
  declarations: [StatisticComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule
  ]
})
export class StatisticModule { }
