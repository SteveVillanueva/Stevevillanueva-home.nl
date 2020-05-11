import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Rating } from './mockData';

export default {
  GET: {
    'https://jsonplaceholder.typicode.com/ratings': {
      handler: getRatings
    }
  },
  POST: {
    'https://jsonplaceholder.typicode.com/ratingPost': {
      handler: postRatings
    }
  }
};
function getRatings() {
  console.log('test')
  return of(new HttpResponse({
    status: 200, body: Rating
  }));
}

function postRatings(Ratings) {
  console.log('Rating')
  console.log('test')
  return of(new HttpResponse({
    status: 200, body: Rating

  }));

}
