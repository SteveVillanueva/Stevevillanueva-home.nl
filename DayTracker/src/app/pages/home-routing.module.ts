import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RateComponent } from './rate/rate.component';
import { HomeComponent } from './home/home.component';
import { StatisticComponent } from './statistic/statistic.component';
import { DetailComponent } from './home/detail/detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rate', component: RateComponent},
  { path: 'statistic', component: StatisticComponent},
  { path: 'detail/:date', component: DetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
