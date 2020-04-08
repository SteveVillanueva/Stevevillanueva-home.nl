import { Component, OnInit } from '@angular/core';
import { RatingService } from '../rating.service';
import { Router } from '@angular/router';
import { PostRating } from '../../Interfaces/RatingPost';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

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
    date: [null, Validators.required],
    rating: [null, Validators.required],
    mood: [null, Validators.required],
    comment: [null],
  });
  constructor(public rate: RatingService, private route: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  PostRating(): void {
    for (const i in this.RateForm.controls) {
      this.RateForm.controls[i].markAsDirty();
      this.RateForm.controls[i].updateValueAndValidity();
    }
    this.RatingPost = this.RateForm.value;
    console.log(this.RatingPost.date);
    this.rate.postRatings(this.RatingPost).subscribe(
      data => { console.log(data); },
      err => { console.log(err); },
      () => { }
    );
  }
}
