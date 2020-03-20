import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detail/:date', component: DetailComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayRankRoutingModule { }
