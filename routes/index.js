var express = require('express');
var router = express.Router();

let playerCounter = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  const channelNumber = Math.floor(playerCounter/2);
  const channel = `private-mmm-${channelNumber}`;
  const playerNumber = playerCounter%2;

  res.render('index', {
    channel,
    playerNumber
  });
  playerCounter++;
});

module.exports = router;
