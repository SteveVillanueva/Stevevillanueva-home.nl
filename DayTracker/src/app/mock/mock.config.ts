import { HttpResponse, HttpHeaderResponse, HttpRequest } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Ratings } from '../Interfaces/RatingGet';
import { PostRating } from '../Interfaces/RatingPost'

let data = [];
let data2;
import('./mockData.json').then(result => {
  data = result;
  console.log(data);
  const json = JSON.stringify(data);
  data2 = JSON.parse(json);

});




export default {
  GET: {
    'https://jsonplaceholder.typicode.com/ratings': {
      handler: getRatings,
    }
  },
  POST: {
    'https://jsonplaceholder.typicode.com/ratingPost': {
      handler: postRatings
    }
  }
};

function getRatings() {
  console.log(data2)
  return of(new HttpResponse({
    status: 200, body: data2.default
  }));
}

function postRatings(request: HttpRequest<Ratings[]>) {
  data2.default.push(request.body);
  return of(new HttpResponse({
    status: 200,
    body: data2.default,
  }));
}
