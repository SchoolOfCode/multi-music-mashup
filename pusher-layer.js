const Pusher = require('pusher');

let pusher;

function init() {
  pusher = new Pusher({
    appId: '261921',
    key: '1784c495a02ce5c67fa9',
    secret: '4808e479577c583c09cb',
    cluster: 'eu',
    encrypted: true
  });
  return pusher;
}

module.exports = pusher || init();