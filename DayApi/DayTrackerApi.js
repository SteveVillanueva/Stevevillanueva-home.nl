const koa = require('koa');
const router = require('koa-router')
const bodyParser = require('koa-bodyparser');
const app = new koa();
app.use(bodyParser());
const _ = router();
_.get('/Day', async (ctx, next) => {
    ctx.body = 'Hello World!';
})
_.post('/Score', async (ctx, next) => {
    console.log(ctx.request.body)
    ctx.body = JSON.stringify(ctx.request.body);
})
_.put('/', (ctx, next) => {

})

app.use(_.routes());
app.listen(3000);