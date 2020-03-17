const koa = require('koa');
const router = require('koa-router')
const bodyParser = require('koa-bodyparser');
var mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient

const app = new koa();
app.use(bodyParser());
const _ = router();
// url for db
const url = 'mongodb://127.0.0.1:27017/DayTracker'

mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

// schema
const ratingSchema = new mongoose.Schema({
  // key
  date: { type: Date, required: true, unique: true },
  rating: { type: Number, required: true },
  comment: String
})

// model
var Rating = mongoose.model('Rating', ratingSchema)

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin: *');
  ctx.set('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  ctx.set('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
  await next();
});



function getRating() {
  return new Promise((resolve, reject) => {
    const rating = Rating.find();
    rating.exec((er, ratings) => {
      if (er) { reject(er); }
      else { resolve(ratings); }
    });
  });
}
// get request for api
_.get('/rating', async (ctx, next) => {
  console.log(await getRating())
  ctx.body = await getRating();
})
// post request for api
_.post('/rate', async (ctx, next) => {
  const date = ctx.request.body.date;
  const rating = ctx.request.body.rating;
  const comment = ctx.request.body.comment;

  const steve = new Rating({ date: date, rating: rating, comment: comment })
  await steve.save(function (err, steve) {
    if (err) return console.error(err);
  });

  console.log(ctx.request.body)
  ctx.body = JSON.stringify(ctx.request.body);
})
// put request for api
_.put(`/update`, async (ctx, next) => {
  let doc = await Rating.findOne({ date: '2020-03-17' });
  await Rating.updateOne({ date: '2020-03-17' }, { date: '2021-03-17' })
  await doc.save();
})

_.delete('/delete', async (ctx, next) => {
  Rating.deleteMany({ __v: 0 }, function (err) {
    if (err) return handleError(err);
  });
  console.log('deleted')
})

app.use(_.routes());
app.listen(3000);