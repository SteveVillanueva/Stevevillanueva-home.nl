const Rating = require('./schema')

module.exports = ({ router }) => {
  // get request for all ratings
  router.get('/ratings', async (ctx, next) => {
    console.log(await getRating())
    ctx.body = await getRating();
  })

  // get request for all ratings of month
  router.get('/ratingMonth/:date', async (ctx, next) => {
    let date = ctx.request.path;
    date = date.split('/')[2];
    ctx.body = await Rating.find({
      date: { $lt: new Date(), $gt: new Date('2020-03-10') }
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