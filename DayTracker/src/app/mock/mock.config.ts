import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

export default {
  GET: {
    'https://jsonplaceholder.typicode.com/ratings': {
      handler: getRatings
    }
  }
};

function getRatings() {
  return of(new HttpResponse({
    status: 200, body: [
      {
        date: new Date('2020-04-26'),
        rating: 5,
        mood: 'Angry',
        comment: 'test'
      },
      {
        date: new Date('2020-04-30'),
        rating: 8,
        mood: 'Neutral',
        comment: 'text'
      }
    ]
  }));
}
