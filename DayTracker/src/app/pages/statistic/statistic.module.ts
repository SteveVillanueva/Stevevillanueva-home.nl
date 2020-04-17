import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from './statistic.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [StatisticComponent],
  imports: [
    NgxChartsModule,
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
  ]
})
export class StatisticModule { }
