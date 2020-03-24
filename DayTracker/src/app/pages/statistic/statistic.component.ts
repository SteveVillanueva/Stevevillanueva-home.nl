import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd';
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  month: Date;
  constructor() { }

  ngOnInit(): void {
  }

  getMonth(): void {
    console.log(Date);
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

}
