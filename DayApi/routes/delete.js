const Router = require('koa-router');

const router = new Router()
const Rating = require('./schema')
// middleware that is specific to this router
router.use(async (ctx, next) => {
    console.log('Time: ', Date.now())
    await next()
})

module.exports = ({ router }) => {
    // deletes specific rating
    router.delete('/delete/:date', async (ctx, next) => {
        let date = ctx.request.path
        date = date.split('/')[2];
        console.log(date + ' has been updated')
        Rating.deleteOne({ date: date }, function (err) {
            if (err) return handleError(err);
        });
        ctx.body = JSON.stringify(ctx.request.body);
    })

    // deletes all ratings
    // ! remove when done
    router.delete('/deleteAll', async (ctx, next) => {
        Rating.deleteMany({ month: "4" }, function (err) {
            if (err) return handleError(err);
        });
        console.log('deleted')
    })
}