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
  name: String,
  // key
  date: { type: Date, required: true, unique: true },
  rating: { type: Number, required: true },
  comment: String
})

var Rating = mongoose.model('Rating', ratingSchema)

app.on('error', (err, ctx) => {
  log.error('server error', err)
})

// post request for api
_.post('/Score', async (ctx) => {
  const name = ctx.request.body.name;
  const date = ctx.request.body.date;
  const rating = ctx.request.body.rating;
  const comment = ctx.request.body.rating;
  ctx.query = {
    name: String,
    date: Date,
    rating: Number,
    comment: String
  }

  if (!name || !date || !rating || !comment) {
    console.log('please fill in data')
  } else {
    const steve = new Rating({ name: name, date: date, rating: rating, comment: comment })
    steve.save(function (err, steve) {
      if (err) return console.error(err);
    });
  }
  console.log(ctx.request.body)
  ctx.body = JSON.stringify(ctx.request.body);
})

// get request for api
_.get('/Day', async (ctx) => {
  Rating.find(function (err, Rating) {
    if (err) return console.error(err);
    console.log(Rating)
  })
})

// put request for api
_.put(`/update`, async (ctx) => {
  let doc = await Rating.findOne({ date: '2020-03-17' });
  await Rating.updateOne({ date: '2020-03-17' }, { date: '2021-03-17' })
  await doc.save();
})

_.delete('/delete', async (ctx) => {
  Rating.deleteMany({ __v: 0 }, function (err) {
    if (err) return handleError(err);
  });
  console.log('deleted')
})

app.use(_.routes());
app.listen(3000);