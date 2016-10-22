var express = require('express');
var router = express.Router();

const pusher = require('../pusher-layer');

/* GET home page. */
router.post('/auth', function(req, res, next) {
  console.log('Authing user')
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

module.exports = router;
