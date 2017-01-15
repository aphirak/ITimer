const isOnline = require('is-online');
 
isOnline(['http://chutiphon-k.info']).then(online => {
    console.log(online);
    //=> true 
});