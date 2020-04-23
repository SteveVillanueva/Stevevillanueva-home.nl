const Router = require('koa-router');
const Koa = require('koa');
const app = new Koa();
const router = new Router()
const DayRating = require('./schema')
// middleware that is specific to this router

module.exports = ({ router }) => {
  router.post('/rate', async (ctx, next) => {
    const date = new Date(ctx.request.body.date);
    const rating = ctx.request.body.rating;
    const mood = ctx.request.body.mood;
    const comment = ctx.request.body.comment;
    date.setUTCHours(0, 0, 0, 0);
    const steve = new DayRating({ date: date, rating: rating, mood: mood, comment: comment });
    ctx.body = JSON.stringify(ctx.request.body);
    await steve.save(function (err, steve) {
      console.log(err)
      console.log('test2')
      ctx.body = JSON.stringify(ctx.request.body);

    });
  })
}