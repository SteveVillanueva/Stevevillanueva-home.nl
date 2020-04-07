import { Component, OnInit } from '@angular/core';
import { RatingService } from '../rating.service';
import { Router } from '@angular/router';
import { PostRating } from '../../Interfaces/RatingPost';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  RatingPost: PostRating = {
    date: new Date(),
    rating: null,
    mood: '',
    comment: ''
  };
  postMsg: string;
  RateForm = this.fb.group({
    date: ['', Validators.required],
    rating: ['', Validators.required],
    mood: ['', Validators.required],
    comment: [''],
  });
  constructor(public rate: RatingService, private route: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  PostRating(): void {
    console.log(this.RateForm)
    console.log(this.RatingPost.date);
    this.rate.postRatings(this.RatingPost).subscribe(
      data => { console.log(data); },
      err => { console.log(err); },
      () => { this.route.navigateByUrl('result/201'); }
    );
  }
}
