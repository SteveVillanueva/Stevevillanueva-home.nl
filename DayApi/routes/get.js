const Router = require('koa-router')();

router.get('/', function* () {
  this.body = 'router test';
});
// gets all dates
 function test () {
  console.log('test')
}

  



module.export = router