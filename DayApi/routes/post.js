const Router = require('koa-router');
const Koa = require('koa');
const app = new Koa();
const router = new Router()
const Rating = require('./schema')
// middleware that is specific to this router

module.exports = ({ router }) => {
    router.post('/rate', async (ctx, next) => {
        const date = new Date(ctx.request.body.date);
        const rating = ctx.request.body.rating;
        const mood = ctx.request.body.mood;
        const comment = ctx.request.body.comment;
        date.setUTCHours(0, 0, 0, 0);
        const steve = new Rating({ date: date, rating: rating, mood: mood, comment: comment });
        ctx.body = JSON.stringify(ctx.request.body);
        await steve.save(function (err, steve) {
            if (err) {
                const err = new Error('Access denied to the resource');
                err.status = 401;
                err.expose = true;
                throw err;
            }
            else {
                console.log('test2')
                ctx.body = JSON.stringify(ctx.request.body);
            }
        });
    })
    const jsonErrorHandler = async (ctx, next) => {
        try {
          await next();
        } catch (err) {
          const isJson = ctx.get('Accept') === 'application/json';
          if (isJson) {
            ctx.body = {
              error: 'An error just occurred'
            }
          } else {
            throw err;
          } 
        }
      }
      
      app.use(jsonErrorHandler);
}