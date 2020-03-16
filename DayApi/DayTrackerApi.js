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
const ratingSchema = new mongoose.Schema({
  name: String,
  date: Date,
  rating: Number,
  comment: String
})


ratingSchema.path('Steve');
var Rating = mongoose.model('Rating', ratingSchema)

// post request for api
_.post('/Score', async (ctx, next) => {
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
  
  if(!name || !date || !rating || !comment) {
    console.log('please fill in data')
  } else {
    const steve = new Rating({ name: name, date: date, rating: rating, comment:  comment})
    steve.save(function (err, steve) {
      if (err) return console.error(err);
    });
  }
 

  console.log(ctx.request.body)
  ctx.body = JSON.stringify(ctx.request.body);
})

// get request for api
_.get('/Day', async (ctx, next) => {
  Rating.find(function (err, Rating) {
    if (err) return console.error(err);
    console.log(Rating)
  })
})

// put request for api
_.put('/', (ctx, next) => {

})

_.delete('/delete', (ctx, next) => {
  Rating.deleteMany({ __v: 0 }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });
  console.log('deleted')
})

app.use(_.routes());
app.listen(3000);