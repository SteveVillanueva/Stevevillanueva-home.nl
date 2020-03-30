const Router = require('koa-router');

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
                ctx.body = JSON.stringify(err)
                console.log('error')
               
            }
            else {
                console.log('test2')
                ctx.body = JSON.stringify(ctx.request.body);
            }
        });
        
    })
}