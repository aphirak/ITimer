// const isOnline = require('is-online');

// isOnline().then(online => {
//     console.log(online);
//     //=> true
// });

const dns = require('dns')

dns.resolve('www.google.com', function(err) {
  if (err) {
     console.log("No connection");
  } else {
     console.log("Connected");
  }
});