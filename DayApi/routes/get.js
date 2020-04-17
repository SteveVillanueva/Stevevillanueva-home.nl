const Rating = require('./schema')

module.exports = ({ router }) => {
  // get request for all ratings
  router.get('/ratings', async (ctx, next) => {
    console.log(await getRating())
    ctx.body = await getRating();
  })

  // get request for all ratings of month
  router.get('/ratingMonth/:month', async (ctx, next) => {
    let month = ctx.request.path;
    month = month.split('/')[2];
    month = month.replace(/\%/g, " ");
    month = month.split(' ')[0];
    month = new Date(month)
    let start = new Date(month.getFullYear(), month.getMonth(), 1);
    let end = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    ctx.body = await Rating.find({
      date: { $lt: end, $gt: start }
    })
  })

  router.get('/ratingMonthGraph/:month', async (ctx, next) => {
    let month = ctx.request.path;
    month = month.split('/')[2];
    month = month.replace(/\%/g, " ");
    month = month.split(' ')[0];
    month = new Date(month)
    let start = new Date(month.getFullYear(), month.getMonth(), 1);
    let end = new Date(month.getFullYear(), month.getMonth() + 1, 0);
      ctx.body = await Rating.find({
        date: { $lt: end, $gt: start }
      }).select({ _id: 0, rating: 1, date: 2 })
  })

  router.get('/ratingYear/:year', async (ctx, next) => {
    console.log(ctx.request.body);
    let year = ctx.request.path;
    year = year.split('/')[2];
    year = year.replace(/\%/g, " ");
    year = year.split(' ')[0];
    year = new Date(year);
    let start = new Date(year.getFullYear(), 1, -29);
    let end = new Date(year.getFullYear(), 11, 31);
    ctx.body = await Rating.find({
      date: { $lt: end, $gt: start }
    })

  })

  // get request for rating on specific date
  router.get('/rating/:date', async (ctx, next) => {
    let date = ctx.request.path;

    date = date.split('/')[2];
    ctx.body = await Rating.findOne({ date: date });
  })
}

function getRating() {
  return new Promise((resolve, reject) => {
    const rating = Rating.find();
    rating.exec((er, ratings) => {
      if (er) { reject(er); }
      else { resolve(ratings); }
    });
  });
}