import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../rating.service';
import { Router } from '@angular/router';
import { Ratings } from '../../../Interfaces/RatingGet';
import { RatingUpdate } from '../../../Interfaces/RatingUpdate';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { MockService } from '../../mock.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  urlDate: string;
  RatingGet: Ratings = {
    date: new Date(),
    rating: null,
    mood: '',
    comment: ''
  };

  UpdateForm = this.fb.group({
    rating: [this.RatingGet.rating, Validators.required],
    mood: [this.RatingGet.mood, Validators.required],
    comment: [this.RatingGet.mood],
  });

  RatingUpdate: RatingUpdate = {
    rating: null,
    mood: '',
    comment: ''
  };
  constructor(public rate: RatingService, private route: Router, private fb: FormBuilder, public mock: MockService) { }

  ngOnInit(): void {
    this.urlDate = this.route.url.substr(this.route.url.indexOf('-') + -4);
    this.GetDetailRating();
  }

  // gets data from specific date
  GetDetailRating(): void {
    this.mock.getDetailRating().subscribe(
      data => { this.RatingGet = data[1]; }
    );
  }

  // deletes a rating
  DeleteRating(): void {
    this.rate.deleteRating(this.urlDate).subscribe(
      data => { },
      err => { },
      () => { this.route.navigateByUrl('result/201'); }
    );
  }

  // updates a rating
  UpdateRating(): void {
    // tslint:disable-next-line: forin
    for (const i in this.UpdateForm.controls) {
      this.UpdateForm.controls[i].markAsDirty();
      this.UpdateForm.controls[i].updateValueAndValidity();
    }
    this.RatingUpdate = this.UpdateForm.value;
    this.rate.updateRating(this.urlDate, this.RatingUpdate).subscribe(
      data => { },
      err => { },
      () => { this.route.navigateByUrl('result/201'); }
    );
  }

  Cancel(): void {
    this.route.navigateByUrl('home');
  }
}
