import { Component, OnInit } from '@angular/core';
import { RateService } from '../rate.service';
import { Ratings } from '../../Interfaces/Ratings'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private rate: RateService) { }

  ngOnInit(): void {
  }

  GetUsers(): void {
    this.rate.Ratings().subscribe()
    data => {console.log(data)}
  }

}
