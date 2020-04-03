import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  code: string;
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.redirect();
  }

  redirect(): void {
    this.code = this.route.url.substr(this.route.url.indexOf('/') + -3);
    console.log(this.code);
  }

  home(): void {
    this.route.navigateByUrl('home');
  }

  rate(): void {
    this.route.navigateByUrl('rate');
  }

}
