import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Ratings } from '../Interfaces/RatingGet';
import * as Rating from './mockData.json';

const json = Rating;
const data = JSON.stringify(json);
const data2 = JSON.parse(data);

export default {

  GET: {
    'https://jsonplaceholder.typicode.com/ratings': {
      handler: getRatings,
    }
  },
  POST: {
    'https://jsonplaceholder.typicode.com/ratingPost': {
      handler: getRatings
    }
  }
};

function getRatings() {


  console.log(data2)
  return of(new HttpResponse({
    status: 200, body: data2.default
  }));
}

function postRatings(Ratings) {
  console.log('Rating');
  console.log('test');

  return of(new HttpResponse({
    status: 200, body: Rating
  }));

}
