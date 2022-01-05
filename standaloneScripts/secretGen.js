var randomstring = require("randomstring");

var secret = randomstring.generate({
    length: 32,
    charset: 'alphabetic'
  });
console.log(secret)