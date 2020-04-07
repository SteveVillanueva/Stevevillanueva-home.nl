const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

app.use(bodyParser());
app.use(cors());

// post request for api
const router = new Router();
require('./routes/get')({ router });
require('./routes/post')({ router });
require('./routes/put')({ router });
require('./routes/delete')({ router });

app.use(router.routes());
app.use(router.allowedMethods());

app.use(router.routes());
app.listen(3000);