const path = require('path');

var express = require('express');
var router = express.Router();

const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '261921',
  key: '1784c495a02ce5c67fa9',
  secret: '4808e479577c583c09cb',
  cluster: 'eu',
  encrypted: true
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'views',  'index.html'));

  setTimeout(() => {
    console.log('sending a message')
    pusher.trigger('test_channel', 'my_event', {
      "message": "hello world"
    });
    console.log('triggered a message')
  }, 2000);

});

module.exports = router;
