import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RateComponent } from './rate/rate.component';
import { HomeComponent } from './home/home.component';
import { StatisticComponent } from './statistic/statistic.component';
import { DetailComponent } from './home/detail/detail.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rate', component: RateComponent },
  { path: 'statistic', component: StatisticComponent },
  { path: 'detail/:date', component: DetailComponent },
  { path: '404', component: ResultComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
