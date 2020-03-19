const koa = require('koa');
const router = require('koa-router')
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors')
var mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient

const app = new koa();
app.use(bodyParser());
app.use(cors());
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
  mood: String,
  comment: String
})

// model
var Rating = mongoose.model('Rating', ratingSchema)



function getRating() {
  return new Promise((resolve, reject) => {
    const rating = Rating.find();
    rating.exec((er, ratings) => {
      if (er) { reject(er); }
      else { resolve(ratings); }
    });
  });
}

// post request for api
_.post('/rate', async (ctx, next) => {
  const date = new Date(ctx.request.body.date);
  const rating = ctx.request.body.rating;
  const mood = ctx.request.body.mood;
  const comment = ctx.request.body.comment;
  date.setHours(2, 0, 0, 0);
  const steve = new Rating({ date: date, rating: rating, mood: mood, comment: comment })
  await steve.save(function (err, steve) {
    if (err) return console.error(err);
  });
})

// gets all dates
_.get('/ratings', async (ctx, next) => {
  console.log(await getRating())
  ctx.body = await getRating();
})

// gets data on specific date
_.get('/rating/:date', async (ctx, next) => {
  let date = ctx.request.path;
  date = date.split('/')[2];
  ctx.body = await Rating.findOne({ date: date });
})

// put request for api
_.put(`/update/:date`, async (ctx, next) => {
  let date = ctx.request.path
  date = date.split('/')[2];
  let doc = await Rating.findOne({ date: date });
  await Rating.updateOne({ date: date }, { comment: ctx.request.body.comment })
  await doc.save();
})

// deletes specific rating
_.delete('/delete/:date', async (ctx, next) => {
  let date = ctx.request.path
  date = date.split('/')[2];
  Rating.deleteOne({date: date}, function (err) {
    if (err) return handleError(err);
  }); 
})

// deletes all ratings
// ! remove when done
_.delete('/deleteAll', async (ctx, next) => {
  Rating.deleteMany({ __v: 0 }, function (err) {
    if (err) return handleError(err);
  });
  console.log('deleted')
})

app.use(_.routes());
app.listen(3000);