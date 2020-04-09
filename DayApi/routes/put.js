
const Rating = require('./schema')

module.exports = ({ router }) => {
    // put request for api
    router.put(`/update/:date`, async (ctx, next) => {
        let date = ctx.request.path
        date = date.split('/')[2];
        let doc = await Rating.findOne({ date: date });
        console.log(date + ' has been updated')
        await Rating.updateOne({ date: date }, { comment: ctx.request.body.comment, mood: ctx.request.body.mood, rating: ctx.request.body.rating })
        await doc.save();
        ctx.body = JSON.stringify(ctx.request.body);
    })
}